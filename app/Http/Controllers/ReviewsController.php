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
    	$data = $request->input('movie_id', false);
    	$review = new Review;
    	if (!data) {
    		self::makeResponse([], 400, 'Missing data.', '');
    	}
    	foreach ($data as $key => $value) {
            if ($review->$key !== $value) {
                $review->$key = $value;
            }
        }
        $review->created_at = Carbon::now();
        $review->updated_at = Carbon::now();
        $review->save();

        return self::makeResponse(array('id' => $review->id), 200, 'New review added', '');
    }
}
