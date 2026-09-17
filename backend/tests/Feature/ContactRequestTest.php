<?php

namespace Tests\Feature;

use App\Mail\ContactConfirmation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactRequestTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_sends_a_confirmation_email_for_a_valid_request(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/delibot/contact', [
            'email' => 'customer@example.com',
            'phone' => '+91 98765 43210',
            'company' => 'Example Hotels',
            'message' => 'Please contact me about DeliBot.',
        ]);

        $response
            ->assertOk()
            ->assertExactJson(['message' => 'Thank you for contacting']);

        Mail::assertSent(ContactConfirmation::class, function (ContactConfirmation $mail): bool {
            return $mail->hasTo('customer@example.com');
        });

        $this->assertDatabaseHas('contact_submissions', [
            'source' => 'delibot',
            'email' => 'customer@example.com',
            'phone' => '+91 98765 43210',
            'company' => 'Example Hotels',
            'message' => 'Please contact me about DeliBot.',
        ]);
    }

    public function test_it_rejects_an_invalid_email(): void
    {
        Mail::fake();

        $this->postJson('/api/delibot/contact', ['email' => 'not-an-email'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email', 'phone', 'message']);

        Mail::assertNothingSent();
        $this->assertDatabaseCount('contact_submissions', 0);
    }

    public function test_camera_datasheet_request_sends_the_same_confirmation_email(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/camera/contact', [
            'email' => 'camera.customer@example.com',
            'phone' => '+91 98765 43210',
            'company' => 'Example Security',
            'message' => 'Please send me the camera datasheet.',
        ]);

        $response
            ->assertOk()
            ->assertExactJson(['message' => 'Thank you for contacting']);

        Mail::assertSent(ContactConfirmation::class, function (ContactConfirmation $mail): bool {
            return $mail->hasTo('camera.customer@example.com');
        });

        $this->assertDatabaseHas('contact_submissions', [
            'source' => 'camera',
            'email' => 'camera.customer@example.com',
            'phone' => '+91 98765 43210',
            'company' => 'Example Security',
            'message' => 'Please send me the camera datasheet.',
        ]);
    }
}
