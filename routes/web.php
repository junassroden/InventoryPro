<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\OtpController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Landing/Index')->name('home');

Route::middleware('guest')->group(function () {

    Route::inertia('/login', 'Auth/Login')
        ->name('login');

    Route::post('/login', [LoginController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('login.store');

    Route::inertia('/register', 'Auth/Register')
        ->name('register');

    Route::post('/register', [RegisterController::class, 'store'])
        ->middleware('throttle:5,10')
        ->name('register.store');

    Route::post('/send-otp', [OtpController::class, 'send'])
        ->middleware('throttle:5,1')
        ->name('send.otp');
});

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Dashboard');
    })->name('dashboard');

});