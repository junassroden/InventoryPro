<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OtpVerification extends Model
{
    protected $table = 'otp_verifications';

    protected $fillable = [
        'email',
        'otp_code',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];
}