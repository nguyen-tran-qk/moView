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
    public function getUserById($id = null) {
        if ($id == null) {
            return self::makeResponse(User::orderBy('id', 'asc')->get(), 200, '', '');
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
    public function addNewUser(Request $request) {
        $user = new User;

        $user->username = $request->input('username');
        $user->password = $request->input('password');
        $user->role = 1;
        $user->save();

        // return 'User record successfully created with id ' . $user->id;
        return self::makeResponse(array('user' => array('id' => $user->id)), 200, '', '');

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

        return self::makeResponse(array('user' => array('id' => $user->id)), 200, '', '');
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
        $user = User::where('username', $request->input('username'))->first();
        if (isset($user)) {
            // echo $user;
           if ($user->password == $request->input('password')) {
                return self::makeResponse(array('user' => $user), 200, '', '');
               // return $user;
           } else {
                return self::makeResponse([], 404, 'Invalid username/password', '');
            }
        } else {
            return self::makeResponse([], 404, 'Invalid username/password', '');
        }
    }
}
