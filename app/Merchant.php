<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
	protected $guarded = [];

	public function Coupon(){
		return $this->hasMany('App\Coupon');
	}
}
