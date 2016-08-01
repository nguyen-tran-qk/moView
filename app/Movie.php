<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = [
        'id', 'name', 'description', 'duration', 'cast', 'genre', 'director',
        'date_released', 'rating', 'trailer', 'poster'
    ];
}
