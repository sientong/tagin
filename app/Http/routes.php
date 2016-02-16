<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use App\Coupon;
use App\Article;
use App\Merchant;
use App\Category;

Route::get('/', function () {
    $merchants = Merchant::all()->take(12);
    $coupons = Coupon::select('coupons.*', 'merchants.logo', 'merchants.name as merchantName')
                    ->join('merchants', 'coupons.merchant_id', '=', 'merchants.id')
					->orderBy('created_at','desc')
					->take(8)
                    ->get();
    $articles = Article::orderBy('created_at','desc')
				->take(8)
				->get();

    return view('welcome')->with('coupons', $coupons)
                        -> with('merchants', $merchants)
                        ->with('articles', $articles);
});

Route::post('infos/uploadImage',[
    'as' => 'image.upload',
    'uses' => 'ArticleController@uploadImage'
]);

Route::get('image/browse',[
    'as' => 'image.browse',
    'uses' => 'ArticleController@browseImage'
]);

Route::get('/category', function () {
    $categories = Category::all()->where('type', 'shopping');
    $merchants = Merchant::all();

    return view('coupon.category')->with('categories', $categories)
                                ->with('merchants', $merchants);
});

Route::get('/merchant/{name}', array('uses' => 'MerchantController@showList'));

Route::get('/category/{name}', array('uses' => 'CategoryController@showCategory'));

Route::get('/modal/{id}', array('uses' => 'CategoryController@showCategoryModal'));

Route::get('/about', function () {
    return view('about');
});

Route::get('/legal', function () {
    return view('legal');
});

Route::get('/login', function () {
    return view('login');
});

Route::get('/article', function () {
    $articles = Article::all();
    return view('article.list')->with('articles', $articles);
});

Route::get('/article/detail/{id}', array('uses' => 'ArticleController@showPublic'));

Route::get('/index', function(){
    $coupons = Coupon::all();
    return View::make('index')->with('coupons', $coupons);
});

Route::get('/admin', 'UserController@getAdminLogin');
Route::post('/admin', 'UserController@postAdminLogin');
Route::get('/logout', 'UserController@getLogout');

Route::get('/admin/dashboard', function () {
    return view('admin.content');
});

Route::model('articles', 'Article');
Route::model('merchants', 'Merchant');
Route::model('coupons', 'Coupon');
Route::model('categories', 'Category');

Route::bind('articles', function($value, $route) {
	return App\Article::whereSlug($value)->first();
});

Route::bind('merchants', function($value, $route) {
	return App\Merchant::whereSlug($value)->first();
});

Route::bind('coupons', function($value, $route){
    return App\Coupon::whereSlug($value)->first();
});

Route::bind('categories', function($value, $route){
    return App\Category::whereSlug($value)->first();
});

Route::resource('admin/article','ArticleController');
Route::resource('admin/merchant', 'MerchantController');
Route::resource('admin/coupon', 'CouponController');
Route::resource('admin/category', 'CategoryController');