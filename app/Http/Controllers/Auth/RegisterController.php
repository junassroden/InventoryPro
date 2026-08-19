<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\OtpVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        $request->merge([
            'email' => strtolower(trim($request->email)),
        ]);

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:100',
            ],

            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'otp' => [
                'required',
                'digits:6',
            ],

            'password' => [
                'required',
                'string',
                'confirmed',

                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols(),
            ],
        ]);

        $email = strtolower(
            trim($validated['email'])
        );

        /*
        |--------------------------------------------------------------------------
        | CHECK EMAIL
        |--------------------------------------------------------------------------
        */

        if (User::where('email', $email)->exists()) {
            throw ValidationException::withMessages([
                'email' => 'This email is already registered.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | FIND LATEST VALID OTP
        |--------------------------------------------------------------------------
        */

        $otpRecord = OtpVerification::where(
            'email',
            $email
        )
        ->where(
            'expires_at',
            '>',
            now()
        )
        ->latest('id')
        ->first();

        if (!$otpRecord) {
            throw ValidationException::withMessages([
                'otp' =>
                    'The verification code is invalid or has expired.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | VERIFY OTP
        |--------------------------------------------------------------------------
        */

        if (
            !hash_equals(
                (string) $otpRecord->otp_code,
                (string) $validated['otp']
            )
        ) {
            throw ValidationException::withMessages([
                'otp' =>
                    'The verification code is incorrect.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | CREATE ACCOUNT
        |--------------------------------------------------------------------------
        */

        $user = DB::transaction(function () use (
            $validated,
            $email,
            $otpRecord
        ) {

            $user = User::create([
                'name' => $validated['name'],

                'email' => $email,

                'password' => Hash::make(
                    $validated['password']
                ),
            ]);

            /*
            |--------------------------------------------------------------------------
            | DELETE USED OTP
            |--------------------------------------------------------------------------
            */

            $otpRecord->delete();

            return $user;
        });

        /*
        |--------------------------------------------------------------------------
        | LOGIN
        |--------------------------------------------------------------------------
        */

        Auth::login($user);

        $request->session()->regenerate();

        /*
        |--------------------------------------------------------------------------
        | DASHBOARD
        |--------------------------------------------------------------------------
        */

        return redirect()->route('dashboard');
    }
}