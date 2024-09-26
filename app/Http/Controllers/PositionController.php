<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function index()
    {
        return Position::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'account' => 'required|string',
            'status' => 'required|string', 
        ]);

        return Position::create($validated);
    }

    public function update(Request $request, Position $position)
    {
        $validated = $request->validate([
            'account' => 'required|string',
            'status' => 'required|string', 
        ]);

        $position->update($validated);
        return $position;
    }

    public function destroy(Position $position)
    {
        $position->delete();
        return response()->noContent();
    }
}
