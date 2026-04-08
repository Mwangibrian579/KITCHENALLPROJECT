<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;
    public $email;

    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    public function build()
    {
        // This generates the link that leads back to your Next.js app
        $resetLink = "http://localhost:3000/reset-password?token=" . $this->token . "&email=" . $this->email;

        return $this->subject('Reset Your KitchenAll Pro Password')
                    ->html("<h1>Password Reset Request</h1>
                           <p>Click the link below to reset your password:</p>
                           <a href='{$resetLink}'>Reset Password</a>
                           <p>If you did not request this, please ignore this email.</p>");
    }
}