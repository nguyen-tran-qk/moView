<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Rating;
use App\Http\Controllers\Controller;

class RatingsController extends Controller
{
	public function getRatingById($id = null) {
        if ($id == null) {
            return self::makeResponse(Rating::orderBy('id', 'asc')->get(), 200, '', '');
        } else {
            return self::makeResponse($this->show($id), 200, '', '');
        }
    }

    public function addRating($movie_id, $user_id, $points) {
    	$rating = new Rating;
    	$rating->movie_id = $movie_id;
    	$rating->user_id = $user_id;
    	$rating->points = $points;
        $rating->timestamps = false;
    	$rating->save();
        return array('id' => $rating->id);
    }

    public function getRatingByUser($user_id) {
    	return Rating::where('user_id', $user_id)->first();
    }
}
