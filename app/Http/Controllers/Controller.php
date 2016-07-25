<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;

class Controller extends BaseController
{
    use AuthorizesRequests, AuthorizesResources, DispatchesJobs, ValidatesRequests;

    protected function makeResponse($body, $status = 200, $message = '', $detail = '') {
    $response = array(
      'meta' => array(
        'code' => $status,
        'message' => $message,
      ),
      'body' => $body,
    );
    if ($detail) {
      $response['meta']['detail'] = $detail;
    }
    // Log::info(json_encode($response));
    // if ($cookie) {
    //   return response()->json($response)->withCookie(cookie()->forever('usercookie', $cookie));
    // } else {
      return response()->json($response);
    // }
  }
}
