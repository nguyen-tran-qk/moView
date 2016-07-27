<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConstraintsReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->foreign('movie_id')->references('id')->on('movies');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropForeign(['movie_id']);
            $table->dropForeign(['user_id']);
        });
    }
}
