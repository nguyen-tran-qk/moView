<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Movie;
use App\Review;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ReviewsController extends Controller
{
	public function getReviewsByMovie($movie_id) {
		$review = DB::table('reviews')->where('movie_id', $movie_id)->get();
		// LATER: need get collection of Likes
		return $review;
	}
    public function addReview(Request $request, $id) {

    }
}
