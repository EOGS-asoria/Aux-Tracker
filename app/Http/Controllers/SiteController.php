<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Site;

class SiteController extends Controller
{
    public function index()
    {
        return Site::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'siteName' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'status' => 'required|string|in:Active,Inactive',
        ]);

        $site = Site::create([
            'site_name' => $request->siteName,
            'location' => $request->location,
            'status' => $request->status,
        ]);

        return response()->json($site, 201);
    }

    public function update(Request $request, $id)
    {
        $site = Site::findOrFail($id);
        $site->update($request->only('status'));

        return response()->json($site);
    }

    public function destroy($id)
    {
        $site = Site::findOrFail($id);
        $site->delete();

        return response()->json(null, 204);
    }
}
