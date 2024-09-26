<?php

namespace App\Http\Controllers;

use App\Models\TeamLeader;
use Illuminate\Http\Request;

class TeamLeaderController extends Controller
{
    public function index()
    {
        return TeamLeader::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'account' => 'required|string|max:255',
            'site' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
        ]);

        $teamLeader = TeamLeader::create($request->all());

        return response()->json($teamLeader, 201);
    }

    public function show($id)
    {
        return TeamLeader::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|required|string|max:255',
            'account' => 'sometimes|required|string|max:255',
            'site' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
        ]);

        $teamLeader = TeamLeader::findOrFail($id);
        $teamLeader->update($request->all());

        return response()->json($teamLeader);
    }

    public function destroy($id)
    {
        $teamLeader = TeamLeader::findOrFail($id);
        $teamLeader->delete();

        return response()->json(null, 204);
    }
}
