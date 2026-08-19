<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\OtpVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OtpController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $email = strtolower(trim($request->email));

        // Check if email is already registered
        if (User::where('email', $email)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'This email is already registered.',
            ], 422);
        }

        $serviceId = env('EMAILJS_SERVICE_ID');
        $templateId = env('EMAILJS_TEMPLATE_ID');
        $publicKey = env('EMAILJS_PUBLIC_KEY');
        $privateKey = env('EMAILJS_PRIVATE_KEY');

        if (!$serviceId || !$templateId || !$publicKey) {
            Log::error('EmailJS configuration missing');

            return response()->json([
                'success' => false,
                'message' => 'EmailJS is not configured correctly.',
            ], 500);
        }

        $otp = str_pad(
            random_int(0, 999999),
            6,
            '0',
            STR_PAD_LEFT
        );

        try {
            // Remove previous OTP
            OtpVerification::where('email', $email)->delete();

            // Save new OTP
            OtpVerification::create([
                'email' => $email,
                'otp_code' => $otp,
                'expires_at' => now()->addMinutes(3),
            ]);
        } catch (\Throwable $e) {
            Log::error('OTP DATABASE ERROR', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to save OTP: ' . $e->getMessage(),
            ], 500);
        }

        try {
            $payload = [
                'service_id' => $serviceId,
                'template_id' => $templateId,
                'user_id' => $publicKey,

                'template_params' => [
                    'to_email' => $email,
                    'otp' => $otp,
                ],
            ];

            if (!empty($privateKey)) {
                $payload['accessToken'] = $privateKey;
            }

            Log::info('Sending OTP through EmailJS', [
                'email' => $email,
            ]);

            $response = Http::timeout(30)
                ->withHeaders([
                    'Content-Type' => 'application/json',
                ])
                ->post(
                    'https://api.emailjs.com/api/v1.0/email/send',
                    $payload
                );

            Log::info('EmailJS RESPONSE', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            if (!$response->successful()) {
                Log::error('EMAILJS REJECTED REQUEST', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                // Delete OTP because email was not accepted
                OtpVerification::where('email', $email)->delete();

                return response()->json([
                    'success' => false,
                    'message' => 'EmailJS rejected the request: ' .
                        $response->body(),
                ], 500);
            }

            return response()->json([
                'success' => true,
                'message' => 'OTP sent successfully to ' . $email,
            ], 200);

        } catch (\Throwable $e) {
            Log::error('EMAILJS CONNECTION ERROR', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'EmailJS connection error: ' .
                    $e->getMessage(),
            ], 500);
        }
    }
}