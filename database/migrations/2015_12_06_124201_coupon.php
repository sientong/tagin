<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Coupon extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->binary('logo');
            $table->binary('banner');
            $table->string('desc');
            $table->string('type');
            $table->timestamps();            
        });

        Schema::create('merchants', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->binary('logo');
            $table->binary('banner');
            $table->string('tac');
            $table->string('desc');
            $table->timestamps();
        });

        Schema::create('coupons', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('code');
            $table->string('url');
            $table->string('desc');
            $table->integer('merchant_id')->unsigned();
            $table->integer('category_id')->unsigned();            
            $table->timestamps();
        });

        Schema::table('coupons', function($table) {
            $table->foreign('merchant_id')->references('id')->on('merchants');
            $table->foreign('category_id')->references('id')->on('categories');
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('content');
            $table->string('url');
            $table->integer('category_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('articles', function (Blueprint $table){
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('coupon');
    }
}
