<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail; // Ensure this matches your Mailable namespace

class AuthController extends Controller
{
    /**
     * Handle User Registration
     */
    public function register(Request $request) {
        $fields = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|confirmed|min:8'
        ]);

        $user = User::create([
            'name' => $fields['first_name'] . ' ' . $fields['last_name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'role' => 'customer'
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response([
            'message' => 'Account created successfully!',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    /**
     * Handle User Login
     */
    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Invalid email or password. Please try again.'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response([
            'user' => $user, 
            'token' => $token
        ], 200);
    }

    /**
     * Handle User Logout
     */
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return response([
            'message' => 'Logged out successfully'
        ], 200);
    }

    /**
     * --- FORGOT PASSWORD METHOD ---
     * Updated to send the actual email link.
     */
    public function forgotPassword(Request $request) {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        // Return generic success for security, but don't send email if user doesn't exist
        if (!$user) {
            return response([
                'message' => 'If this email is registered, you will receive a reset link.'
            ], 200);
        }

        // Generate a secure random token
        $token = Str::random(64);

        // Store the hashed token in the password_reset_tokens table
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => Hash::make($token), 
                'created_at' => now()
            ]
        );

        // --- THE UPDATE: Triggering the Mailer ---
        try {
            Mail::to($user->email)->send(new ResetPasswordMail($token, $user->email));
            
            return response([
                'message' => 'Reset link has been sent to your email.',
                // 'debug_token' => $token // Uncomment only for local testing if needed
            ], 200);
        } catch (\Exception $e) {
            // Log the error if mail fails
            return response([
                'message' => 'Could not send email. Please check your mail configuration.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * --- RESET PASSWORD METHOD ---
     */
    public function resetPassword(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|confirmed|min:8'
        ]);

        $resetRecord = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$resetRecord || !Hash::check($request->token, $resetRecord->token)) {
            return response([
                'message' => 'The reset link is invalid or has expired.'
            ], 400);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response(['message' => 'User not found.'], 404);
        }

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response([
            'message' => 'Password reset successfully! You can now login.'
        ], 200);
    }
}