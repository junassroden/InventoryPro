<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function store(Request $request)
    {
        // Validate login input
        $validated = $request->validate([
            'email' => [
                'required',
                'email',
            ],

            'password' => [
                'required',
                'string',
            ],

            'remember' => [
                'nullable',
                'boolean',
            ],
        ]);

        // Normalize email
        $email = strtolower(trim($validated['email']));

        // IMPORTANT:
        // Auth::attempt() checks the email AND password
        // against the users table.
        $credentials = [
            'email' => $email,
            'password' => $validated['password'],
        ];

        if (!Auth::attempt(
            $credentials,
            $request->boolean('remember')
        )) {

            // Login FAILED
            // User stays on login page.
            throw ValidationException::withMessages([
                'email' => 'The email or password is incorrect.',
            ]);
        }

        // Login succeeded.
        // Regenerate session for security.
        $request->session()->regenerate();

        // ONLY a successfully authenticated user reaches here.
        return redirect()->route('dashboard');
    }
}