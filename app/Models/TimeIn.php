<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeIn extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_id',
        'clock_in',
        'clock_out',
        'lunch_in',
        'lunch_out',
        'floor_in',
        'floor_out',
    ];

   
}
