<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeoAnalytics extends Model
{
    protected $fillable = [
        'user_id',
        'ip_address',
        'country',
        'city',
        'latitude',
        'longitude'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 