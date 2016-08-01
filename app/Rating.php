<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = [
        'id', 'movie_id', 'user_id', 'points'
    ];
}
