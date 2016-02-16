<?php

namespace App\Http\Controllers;

use Input;
use Redirect;
use DB;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Merchant;
use App\Coupon;

class MerchantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $merchants = Merchant::all();
        return view('admin.merchant.default', compact('merchants'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.merchant.create');
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
        
        if(Input::file('banner') != null)
        {
            $banner = Input::file('banner');
            $destinationPath = 'C:/xampp/htdocs/tagin/public/assets/img';
            $filename = $banner->getClientOriginalName();
            $banner->move($destinationPath, $filename);
            
            $input['banner'] = $filename;
        }

        if(Input::file('logo') != null)
        {
            $logo = Input::file('logo');
            $logoDestinationPath = 'C:/xampp/htdocs/tagin/public/assets/img';
            $logoFilename = $logo->getClientOriginalName();
            $logo->move($logoDestinationPath, $logoFilename);
    
            $input['logo'] = $logoFilename;
        }

        Merchant::create($input);
 
        return Redirect::route('admin.merchant.index')->with('message', 'Merchant created');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $merchant = Merchant::find($id);

        return view('admin.merchant.show')->with('merchant', $merchant);
    }

    /**
     * Display the list of coupons for specific merchant.
     *
     * @param  string $merchant
     * @return \Illuminate\Http\Response
     */
    public function showList($merchantName)
    {
        $coupons = Merchant::join('coupons', 'coupons.merchant_id', '=', 'merchants.id')
                    ->where('merchants.name', $merchantName)
                    ->get();
        $merchant = DB::table('merchants')->where('name', $merchantName)->first();

        return view('merchant.list')->with('merchantName', $merchantName)
                                    ->with('coupons', $coupons)
                                    ->with('merchant', $merchant);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $merchant = Merchant::find($id);

        return view('admin.merchant.update')->with('merchant', $merchant);
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
        $merchant = Merchant::find($id);
        
        $merchant->name = Input::get('name');
        $merchant->tac = Input::get('tac');
        $merchant->desc = Input::get('desc');

        if(Input::file('banner') != null)
        {
            $banner = Input::file('banner');
            $destinationPath = 'C:/xampp/htdocs/tagin/public/assets/img';
            $filename = $banner->getClientOriginalName();
            $banner->move($destinationPath, $filename);
            
            $merchant['banner'] = $filename;
        }

        if(Input::file('logo') != null)
        {
            $logo = Input::file('logo');
            $logoDestinationPath = 'C:/xampp/htdocs/tagin/public/assets/img';
            $logoFilename = $logo->getClientOriginalName();
            $logo->move($logoDestinationPath, $logoFilename);
    
            $merchant['logo'] = $logoFilename;
        }
        
        $merchant->save();
 
        return Redirect::route('admin.merchant.index', $merchant->id)->with('message', $merchant->title. ' updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $merchant = Merchant::findOrFail($id);
        $merchant->delete();

        return Redirect::route('admin.merchant.index');
    }
}
