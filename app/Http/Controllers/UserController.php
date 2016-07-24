<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getUserbyId($id = null) {
        if ($id == null) {
            return User::orderBy('id', 'asc')->get();
        } else {
            return $this->show($id);
        }
    }

    /**
     * Add a newly created resource into storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function add(Request $request) {
        $user = new User;

        $user->username = $request->input('username');
        $user->password = $request->input('password');
        $user->role = 1;
        $user->save();

        return 'User record successfully created with id ' . $user->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $user = User::find($id);

        // $user->username = $request->input('username');
        $user->password = $request->input('password');
        $user->save();

        return "Sucess updating user #" . $user->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request) {
        $user = User::find($request->input('id'));

        $user->delete();

        return "User record successfully deleted #" . $request->input('id');
    }

    /**
    * Login with username and password
    *
    **/
    public function login(Request $request) {
        // echo $request->input('username');
        $user = User::where('username', $request->input('username'))->first();
        if (isset($user)) {
            // echo $user;
           if ($user->password == $request->input('password')) {
               return $user;
           } else {
                return 'Invalid username/password';
            }
        } else {
            return 'Invalid username/password';
        }
    }
}
