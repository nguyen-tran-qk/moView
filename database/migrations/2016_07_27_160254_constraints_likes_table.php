<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConstraintsLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::table('likes', function (Blueprint $table) {
            $table->foreign('review_id')->references('id')->on('reviews');
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
        Schema::table('likes', function (Blueprint $table) {
            $table->dropForeign(['review_id']);
            $table->dropForeign(['user_id']);
        });
    }
}
