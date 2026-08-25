<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'name',
        'category_id',
        'stock',
        'price',
    ];

    protected $casts = [
        'stock' => 'integer',
        'price' => 'decimal:2',
    ];
}