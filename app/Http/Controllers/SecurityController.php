<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class SecurityController extends Controller
{

    /**
     * @param Request $request
     * @return mixed
     * @throws ValidationException
     */
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['L\'utilisateur est introuvable.'],
            ]);
        }

        return $user->createToken($request->device_name)->plainTextToken;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function register(Request $request) {
        $request->validate([
            'email' => 'required|email|unique:users',
            'name' => 'required',
            'password' => 'required',
            'passwordConfirmation' => 'required|same:password',
        ]);

        $user = User::create($request->only(['email', 'password', 'name']));
        $user->password = Hash::make($request->password);

        return $user->save();
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function logout(Request $request) {
        return $request->user()->tokens()->delete();
    }

}
