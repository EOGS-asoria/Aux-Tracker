<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
//         id
// employee_id
// clock_in
// clock_out
// lunch_in
// lunch_out
// floor_in
// floor_out
        Schema::create('time_ins', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('employee_id')->nullable();
            $table->string('clock_in')->nullable();
            $table->string('clock_out')->nullable();
            $table->string('lunch_in')->nullable();
            $table->string('lunch_out')->nullable();
            $table->string('floor_in')->nullable();
            $table->string('floor_out')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('time_ins');
    }
};
