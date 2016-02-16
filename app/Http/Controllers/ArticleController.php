<?php

namespace App\Http\Controllers;

use Input;
use Redirect;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Article;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::all();
        return view('admin.article.default', compact('articles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.article.create');
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
        Article::create($input);
 
        return Redirect::route('admin.article.index')->with('message', 'Article created');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $article = Article::find($id);

        return view('admin.article.show')->with('article', $article);
    }

    /**
     * Display the specified resource for public page.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showPublic($id)
    {
        $article = Article::find($id);

        return view('article.detail')->with('article', $article);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $article = Article::find($id);

        return view('admin.article.update')->with('article', $article);
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
        $article = Article::find($id);
        
        $article->title = Input::get('title');
        $article->content = Input::get('content');

        $article->save();
 
        return Redirect::route('admin.article.index', $article->id)->with('message', $article->title. ' updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return Redirect::route('admin.article.index');
    }

    /**
     * Upload image inside article using ckeditor
     *
     * @param  request $request
     */
    public function uploadImage(Request $request)
    {
        $file = $request->file('upload');
        $uploadDestination = public_path() . '/upload/article';
        $fileName = preg_replace('/\s+/', '', $file->getClientOriginalName());
        //$fileName = md5($filename) . "_" . $filename;
        $file->move($uploadDestination, $fileName);
    }

    public function browseImage(Request $request)
    {
        $test = $_GET['CKEditorFuncNum'];
        $images = [];
        $files = \File::files(public_path() . '/upload/article');
        foreach ($files as $file) {
        $images[] = pathinfo($file);
        }
        return view('admin.article.image',[
        'files' => $images,
        'test' => $test
        ]);

    }
}
