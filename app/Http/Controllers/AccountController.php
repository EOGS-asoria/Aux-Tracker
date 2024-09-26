<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    // Get all accounts
    public function index()
    {
        return Account::all();
    }

    // Store a new account
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'accountName' => 'required|string|max:255',
            'site' => 'required|string|max:255',
            'dateCreated' => 'required|date',
        ]);

        $account = Account::create($validatedData);
        return response()->json($account, 201); // Return the created account
    }

    // Show a specific account (if needed)
    public function show($id)
    {
        $account = Account::findOrFail($id);
        return response()->json($account);
    }

    // Update an account (if you want to add this functionality)
    public function update(Request $request, $id)
    {
        $account = Account::findOrFail($id);
        
        $validatedData = $request->validate([
            'accountName' => 'sometimes|required|string|max:255',
            'site' => 'sometimes|required|string|max:255',
            'dateCreated' => 'sometimes|required|date',
        ]);

        $account->update($validatedData);
        return response()->json($account);
    }

    // Delete an account
    public function destroy($id)
    {
        $account = Account::findOrFail($id);
        $account->delete();
        return response()->noContent();
    }
}
