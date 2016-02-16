<?php

namespace App\Http\Controllers;

use Input;
use Redirect;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;


class UserController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
	
	public function getAdminLogin()
	{		
		return view('admin.login');
	}
	
	public function postAdminLogin(Request $request)
	{
		if ('admin@tagin.com' == Input::get('email') && 'password' == Input::get('password'))
        {
			return redirect()->intended('/admin/dashboard');
        }
		else return redirect()->intended('/admin')->with('error', 'Wrong username or password');
	}
	
	public function getLogout()
	{
		
	}
}
