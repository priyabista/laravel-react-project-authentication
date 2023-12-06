<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
    public function signUp(SignupRequest $request){
            $data = $request->validated();

            $user = User::create([
                'name'=> $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data ['password']),
                
            ]);
            $token = $user->createToken('main')->plainTextToken();
            return response(compact('user','token'));

    }
}
