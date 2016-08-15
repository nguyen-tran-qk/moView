<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Movie;
use App\Review;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\DB;

class ReviewsController extends Controller
{
	public function getReviewsByMovie($movie_id) {
		$reviews = DB::table('reviews')->where('movie_id', $movie_id)->orderBy('updated_at', 'desc')->get();
        foreach ($reviews as $review => $value) {
            $value->user_name = (new UserController)->show($value->user_id)->username;;
        }
        
		// LATER: need get collection of Likes
		return $reviews;
	}

    public function addReview(Request $request, $movie_id) {
    	$data = $request->input('data', false);
        $user_id = $request->session()->get('user_id', false);
    	$review = new Review;
    	if (!$data) {
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

    public function updateReview(Request $request, $id) {
        $review = Review::find($id);
        $is_update = $request->input('update', false);
        $user = DB::table('users')->where('id', $request->session()->get('user_id'))->first();
        $data = $request->input('data', false);

        if (!$review) {
            return self::makeResponse([], 404, 'Not Found', '');
        }
        if ($user->role != 32) {
                if (!$user || $user->id != $review->user_id) {
                return self::makeResponse([], 401, 'Unauthorized user.', '');
            }
        }
        if ($is_update) {
            if (!$data) {
                return self::makeResponse([], 400, 'Missing data.', '');
            }
            $review->content = $data;
            $review->updated_at = Carbon::now();
            $review->save();
            return self::makeResponse(array('id' => $review->id), 200, '', '');
        } else {
            if ($user->role == 32 || $user->id == $review->user_id) {
                $review->delete();
                return self::makeResponse(array('id' => $review->id), 200, 'Deleted.', '');
            } else {
                return self::makeResponse([], 403, 'Access denied.', '');
            }
        }
    }
}
