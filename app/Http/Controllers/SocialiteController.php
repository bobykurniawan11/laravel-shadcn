<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{

    public function redirectToProvider(Request $request)
    {
        $provider = $request->provider;
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback(Request $request)
    {
        $provider = $request->provider;
        $githubUser = Socialite::driver($provider)->user();
        $provider_id = $githubUser->id;

        // TODO: Handle user registration or login
        $user = User::where('provider_id', $provider_id)->first();

        if (!$user) {
            $user = User::create([
                'name' => $githubUser->name,
                'email' => $githubUser->email,
                'provider' => $provider,
                'provider_id' => $provider_id,
            ]);
        }
        Auth::loginUsingId($user->id);
        return redirect()->route('dashboard');
    }
}
