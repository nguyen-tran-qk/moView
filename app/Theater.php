<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Theater extends Model
{
    protected $fillable = [
        'id', 'name', 'web_address', 'logo'
    ];
}
