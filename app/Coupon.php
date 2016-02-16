<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
	protected $guarded = [];

	public function merchant()
	{
    	return $this->belongsTo('App\Merchant');
	}
}
