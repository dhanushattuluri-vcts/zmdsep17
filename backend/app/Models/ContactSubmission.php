<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    protected $fillable = [
        'source',
        'email',
        'phone',
        'company',
        'message',
        'confirmation_sent_at',
    ];

    protected function casts(): array
    {
        return [
            'confirmation_sent_at' => 'datetime',
        ];
    }
}
