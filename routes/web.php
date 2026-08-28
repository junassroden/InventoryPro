<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
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
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // INVENTORY (PRODUCTS)
    // /inventory, /inventory/create, /inventory/{product}, /inventory/{product}/edit, etc.
    Route::resource('inventory', ProductController::class)
        ->parameters(['inventory' => 'product']);

    // CATEGORIES
    // list + create/update/delete only, no dedicated show/create/edit pages
    Route::resource('categories', CategoryController::class)
        ->except(['show', 'create', 'edit']);

    // LOGOUT
    Route::post('/logout', function (Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home');
    })->name('logout');
});