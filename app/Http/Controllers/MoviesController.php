<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Movie;
use App\Http\Controllers\Controller;

class MoviesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getMoviebyId($id = null) {
        if ($id == null) {
            return self::makeResponse(Movie::orderBy('date_released', 'des')->get(), 200, '', '');
        } else {
            return self::makeResponse($this->show($id), 200, '', '');
        }
    }

    /**
     * Add a newly created resource into storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function addNewMovie(Request $request) {
        $movie = new Movie;

        $movie->name = $request->input('name');
        $movie->description = $request->input('description');
        $movie->duration = $request->input('duration');
        $movie->cast = $request->input('cast');
        $movie->director = $request->input('director');
        $movie->date_released = $request->input('date_released');
        $movie->rating = $request->input('rating');
        $movie->trailer = $request->input('trailer');
        $movie->poster = $request->input('poster');
        $movie->save();

        // return 'Movie record successfully created with id ' . $movie->id;
        return self::makeResponse(array('id' => $movie->id), 200, 'New movie added', '');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        return Movie::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function updateMovie(Request $request, $id) {
        $movie = Movie::find($id);
        $is_update = $request->input('update', false);

        if (!$movie) {
            return self::makeResponse([], 404, 'Not Found', '');
        }

        if (is_update) {
            $movie->name = $request->input('name');
            $movie->description = $request->input('description');
            $movie->duration = $request->input('duration');
            $movie->cast = $request->input('cast');
            $movie->director = $request->input('director');
            $movie->date_released = $request->input('date_released');
            $movie->rating = $request->input('rating');
            $movie->trailer = $request->input('trailer');
            $movie->poster = $request->input('poster');
            $movie->save();
            return self::makeResponse(array('movie' => array('id' => $movie->id)), 200, '', '');
        } else {
            $movie->delete();
            return self::makeResponse(array('id' => $movie->id), 200, 'Deleted.', '');
        }


        // return "Sucess updating user #" . $movie->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function deleteMovie(Request $request) {
        $movie = Movie::find($request->input('id'));

        $movie->delete();

        return self::makeResponse(array('id' => $movie->id), 200, '', '');
    }
}
