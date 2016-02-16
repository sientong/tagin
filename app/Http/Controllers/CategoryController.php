<?php

namespace App\Http\Controllers;

use Input;
use Redirect;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Category;
use App\Article;
use App\Coupon;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        return view('admin.category.default', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.category.create');
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

        Category::create($input);
 
        return Redirect::route('admin.category.index')->with('message', 'Category created');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::find($id);

        return view('admin.category.show')->with('category', $category);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = Category::find($id);

        return view('admin.category.update')->with('category', $category);
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
        $category = Category::find($id);
        
        $category->name = Input::get('name');
        $category->desc = Input::get('desc');

         if(Input::file('banner') != null)
        {
            $banner = Input::file('banner');
            $destinationPath = 'C:/xampp/htdocs/tagin/public/assets/img';
            $filename = $banner->getClientOriginalName();
            $banner->move($destinationPath, $filename);
            
            $category->banner = $filename;
        }

        if(Input::file('logo') != null)
        {
            $logo = Input::file('logo');
            $logoDestinationPath = 'C:/xampp/htdocs/tagin/public/assets/img';
            $logoFilename = $logo->getClientOriginalName();
            $logo->move($logoDestinationPath, $logoFilename);
    
            $category->logo = $logoFilename;
        }

        $category->save();
 
        return Redirect::route('admin.category.index', $category->id)->with('message', $category->title. ' updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Article::where("category_id", $id)->delete();
        Coupon::where("category_id", $id)->delete();
        $category = Category::find($id);
        $category->delete();

        return Redirect::route('admin.category.index');
    }

    /**
     * Display the list of coupons from specific category.
     *
     * @param  string  $categoryName
     * @return \Illuminate\Http\Response
     */
    public function showCategory($id)
    {
        $coupons = Category::join('coupons', 'coupons.category_id', '=', 'categories.id')
                ->where('categories.id', $id)
                ->get();
        $category = Category::find($id);

        return view('coupon.list')->with('coupons', $coupons)
                                ->with('category', $category);
    }

    /**
     * Display the specified resource for coupons.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showCategoryModal($id)
    {
        $coupon = Coupon::find($id);
        $merchant = Coupon::find($id)->merchant;        
        $articles = Article::all();

        return view('modal')->with('coupon', $coupon)
                            ->with('articles',$articles)
                            ->with('merchant', $merchant);
    }
}
