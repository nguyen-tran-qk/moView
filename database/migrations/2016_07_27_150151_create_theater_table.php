<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTheaterTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('theaters', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 250);
            $table->string('web_address', 2000);
            $table->string('logo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('theaters');
    }
}
