<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/users/{id?}', 'UserController@getUserById'); // get current user or get user by id
Route::post('/users', 'UserController@addNewUser');
Route::post('/users/{id}', 'UserController@updateUser');
Route::post('/login', 'UserController@login');
Route::get('/logout', 'UserController@logout');

Route::get('/movies/{id?}', 'MoviesController@getMovieById');
Route::post('/movies', 'MoviesController@addNewMovie'); // send with data object { data: <movie_obj> }
Route::post('/movies/{id}', 'MoviesController@updateMovie'); 
			// send with data object { update: true } if update, otherwise { update: null } to delete
			// there are also { data: <movie_obj>, points: <points> }, 
			// in which 'data' is requied only if Admin updates the movie; points is the rating of user for the movie.

Route::get('/movies/{movie_id}/reviews', 'ReviewsController@getReviewsByMovie');
Route::post('/movies/{movie_id}/reviews', 'ReviewsController@addReview'); // send with data object { data: <content of review> }

Route::post('/reviews/{id}', 'ReviewsController@updateReview');
			// send with data object { update: true } if update, otherwise { update: null } to delete
			// there are also { data: <review_content>, 
			// in which 'data' is requied only if user edit the review