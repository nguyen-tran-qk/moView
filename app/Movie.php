<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = [
        'id', 'name', 'description', 'duration', 'cast', 'director',
        'dateReleased', 'rating', 'trailer', 'poster'
    ];
}
