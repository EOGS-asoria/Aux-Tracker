<?php

// app/Http/Controllers/AgentController.php

namespace App\Http\Controllers;

use App\Models\Agent;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function index()
    {
        return Agent::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'account' => 'required|string|max:255',
            'site' => 'required|string|max:255',
        ]);

        $agent = Agent::create($request->all());
        return response()->json($agent, 201);
    }

    public function show($id)
    {
        return Agent::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $agent = Agent::findOrFail($id);
        $agent->update($request->all());
        return response()->json($agent, 200);
    }

    public function destroy($id)
    {
        $agent = Agent::findOrFail($id);
        $agent->delete();
        return response()->json(null, 204);
    }
}
