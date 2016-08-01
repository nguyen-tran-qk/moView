<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'id', 'movie_id', 'user_id', 'content', 'like_count'
    ];
}
