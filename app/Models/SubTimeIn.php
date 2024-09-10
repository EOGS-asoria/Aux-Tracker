<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubTimeIn extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_id',
        'in',
        'out',
        'type',
    ];
}
