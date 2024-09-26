<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{ 
    use HasFactory;
    protected $fillable = [
        'agent_id',
        'name',
        'position',
        'account',
        'site',
        'status',
    ];
}
