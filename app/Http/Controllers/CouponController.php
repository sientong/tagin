<?php

namespace App\Http\Controllers;

use Input;
use Redirect;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Coupon;
use App\Category;
use App\Merchant;
use App\Article;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $coupons = Coupon::all();
        return view('admin.coupon.default', compact('coupons'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::lists('name', 'id');
        $merchants = Merchant::lists('name','id');
        return view('admin.coupon.create', compact('categories', 'merchants'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = Input::all();
        Coupon::create($input);
 
        return Redirect::route('admin.coupon.index')->with('message', 'Coupon created');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $coupon = Coupon::find($id);

        return view('admin.coupon.show')->with('coupon', $coupon);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $categories = Category::lists('name', 'id');
        $merchants = Merchant::lists('name','id');
        $coupon = Coupon::find($id);

        return view('admin.coupon.update', compact('categories', 'merchants'))->with('coupon', $coupon);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $coupon = Coupon::find($id);
        
        $coupon->name = Input::get('name');
        $coupon->code = Input::get('code');
        $coupon->url = Input::get('url');
        $coupon->discount = Input::get('discount');
        $coupon->merchant_id = Input::get('merchant_id');
        $coupon->category_id = Input::get('category_id');
        $coupon->desc = Input::get('desc');

        $coupon->save();
 
        return Redirect::route('admin.coupon.index', $coupon->id)->with('message', $coupon->title. ' updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->delete();

        return Redirect::route('admin.coupon.index');
    }
}
