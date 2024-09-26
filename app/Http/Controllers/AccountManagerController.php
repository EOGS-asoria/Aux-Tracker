<?php

namespace App\Http\Controllers;

use App\Models\AccountManager;
use Illuminate\Http\Request;

class AccountManagerController extends Controller
{
    public function index()
    {
        return AccountManager::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'account' => 'required|string|max:255',
        ]);
    
        // Create a new account manager
        $accountManager = AccountManager::create([
            'name' => $validatedData['name'],
            'position' => $validatedData['position'],
            'account' => $validatedData['account'],
            'site' => 'San Carlos City',
        ]);
    
        return response()->json($accountManager, 201);
    }
    

    public function destroy($id)
    {
        $manager = AccountManager::findOrFail($id);
        $manager->delete();

        return response()->json(null, 204);
    }
}
