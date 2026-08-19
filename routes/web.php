<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\OtpController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Landing/Index')
    ->name('home');
Route::middleware('guest')->group(function () {
    // LOGIN PAGE
    Route::inertia('/login', 'Auth/Login')
        ->name('login');
    // LOGIN PROCESS
    Route::post('/login', [LoginController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('login.store');
    // REGISTER PAGE
    Route::inertia('/register', 'Auth/Register')
        ->name('register');
    // REGISTER PROCESS
    Route::post('/register', [RegisterController::class, 'store'])
        ->middleware('throttle:5,10')
        ->name('register.store');
    // SEND OTP
    Route::post('/send-otp', [OtpController::class, 'send'])
        ->middleware('throttle:5,1')
        ->name('send.otp');
});

Route::middleware('auth')->group(function () {
    // DASHBOARD
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Dashboard');
    })->name('dashboard');
    // LOGOUT
    Route::post('/logout', function (Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home');
    })->name('logout');
});