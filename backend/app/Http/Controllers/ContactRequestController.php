<?php

namespace App\Http\Controllers;

use App\Mail\ContactConfirmation;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactRequestController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email:rfc', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^[0-9+() .-]{7,20}$/'],
            'company' => ['nullable', 'string', 'max:150'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $source = match ($request->route()?->getName()) {
            'contact.camera' => 'camera',
            default => 'delibot',
        };

        $submission = ContactSubmission::create([
            ...$validated,
            'source' => $source,
        ]);

        if (
            config('mail.default') === 'smtp'
            && config('mail.mailers.smtp.password') === 'paste-google-app-password-here'
        ) {
            return response()->json([
                'message' => 'Email is not configured. Add a Google App Password in backend/.env.',
            ], 503);
        }

        try {
            Mail::to($validated['email'])->send(new ContactConfirmation);
            $submission->update(['confirmation_sent_at' => now()]);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'Gmail rejected the email. Verify the Google App Password and try again.',
            ], 502);
        }

        return response()->json([
            'message' => 'Thank you for contacting',
        ]);
    }
}
