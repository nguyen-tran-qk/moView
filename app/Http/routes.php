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

Route::get('/users/{id?}', 'UserController@getUserbyId');
Route::post('/users', 'UserController@addNewUser');
Route::post('/users/{id}', 'UserController@updateUser');
Route::post('/login', 'UserController@login');

Route::get('/movies/{id?}', 'MoviesController@getMoviebyId');
Route::post('/movies', 'MoviesController@addNewMovie');
Route::post('/movies/{id}', 'MoviesController@updateMovie'); 
			// send with data object { update: true, user_role: <user_role> } if update, otherwise { update: null, user_role: <user_role> } to delete
			// there are also { user_role: <user_role>, data: <movie> }, in which 'data' is requied only if Admin updates the movie; while 'user_role' is always required.