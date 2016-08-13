<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Movie;
use App\Review;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ReviewsController extends Controller
{
	public function getReviewsByMovie($movie_id) {
		$review = DB::table('reviews')->where('movie_id', $movie_id)->get();
		// LATER: need get collection of Likes
		return $review;
	}
    public function addReview(Request $request, $movie_id) {
    	$data = $request->input('data', false);
        $user_id = $request->session()->get('user_id', false);
    	$review = new Review;
    	if (!data) {
    		return self::makeResponse([], 400, 'Missing data.', '');
    	}
        if (!$user_id) {
            return self::makeResponse([], 401, 'Unauthorized user.', '');
        }
        $review->movie_id = $movie_id;
        $review->user_id = $user_id;
        $review->content = $data;
        $review->like_count = 0;
        $review->created_at = Carbon::now();
        $review->updated_at = Carbon::now();
        $review->save();

        return self::makeResponse(array('id' => $review->id), 200, 'New review added', '');
    }
}
