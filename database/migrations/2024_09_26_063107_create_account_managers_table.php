<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountManagersTable extends Migration
{
    public function up()
    {
        Schema::create('account_managers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position');
            $table->string('account');
            $table->string('site')->default('San Carlos City'); // Default value set here
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('account_managers');
    }
}
