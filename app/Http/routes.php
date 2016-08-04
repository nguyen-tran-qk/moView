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

Route::get('/users/{id?}', 'UserController@getUserById');
Route::post('/users', 'UserController@addNewUser');
Route::post('/users/{id}', 'UserController@updateUser');
Route::post('/login', 'UserController@login');

Route::get('/movies/{id?}', 'MoviesController@getMovieById');
Route::post('/movies', 'MoviesController@addNewMovie'); // send with data object { data: <movie_obj> }
Route::post('/movies/{id}', 'MoviesController@updateMovie'); 
			// send with data object { update: true } if update, otherwise { update: null } to delete
			// there are also { user_id: <user_id>, data: <movie_obj> }, in which 'data' is requied only if Admin updates the movie; while 'user_id' is always required.