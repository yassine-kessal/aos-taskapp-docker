<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
// use Jenssegers\Mongodb\Auth\User as Authenticatable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Rewrite createToken trait function to adapt for mongodb
     *
     * @param  string  $name
     * @param  array  $abilities
     */
    // public function createToken(string $name, array $abilities = ['*'])
    // {
    //     $plainTextToken = Str::random(40);

    //     $token = $this->tokens()->create([
    //         'name' => $name,
    //         'token' => hash('sha256', $plainTextToken),
    //         'abilities' => $abilities,
    //     ]);

    //     return new class($token, $plainTextToken) {

    //         public $accessToken;

    //         public $plainTextToken;

    //         public function __construct(PersonalAccessToken $accessToken, string $plainTextToken)
    //         {
    //             $this->accessToken = $accessToken;
    //             $this->plainTextToken = $plainTextToken;
    //         }

    //         public function toArray()
    //         {
    //             return [
    //                 'accessToken' => $this->accessToken,
    //                 'plainTextToken' => $this->plainTextToken,
    //             ];
    //         }

    //         public function toJson($options = 0)
    //         {
    //             return json_encode($this->toArray(), $options);
    //         }

    //     };
    // }
}
