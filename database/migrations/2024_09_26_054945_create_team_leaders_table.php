<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamLeadersTable extends Migration
{
    public function up()
    {
        Schema::create('team_leaders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position');
            $table->string('account');
            $table->string('site')->default('San Carlos Site');
            $table->string('status')->default('Active'); // Default status
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('team_leaders');
    }
}
