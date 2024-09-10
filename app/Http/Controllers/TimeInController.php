<?php

namespace App\Http\Controllers;

use App\Models\TimeIn;
use Illuminate\Http\Request;

class TimeInController extends Controller
{
    public function  store(Request $request)
    {
        TimeIn::create([
            'employee_id' => $request->user_id,
            'clock_in' => $request->date,
        ]);
        return 'heelo world';
    }

    public function show($id)
    {
        $time_in = TimeIn::where('employee_id', $id)->get();
        return response()->json([
            'data' => $time_in
        ], 200);
    }
}
