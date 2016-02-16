$data = Input::all();
		// Applying validation rules.
		$rules = array(
			'email' => 'required|email',
			'password' => 'required|min:6'
			 );
			 
		$validator = Validator::make($data, $rules);
			
		if ($validator->fails()){
		  // If validation falis redirect back to login.
		  return Redirect::to('/')->withInput(Input::except('password'))->withErrors($validator);
		}
		else {
		  $userdata = array(
				'email' => Input::get('email'),
				'password' => Input::get('password')
			  );
		  // doing login.
		  if (Auth::validate($userdata)) {
			if (Auth::attempt($userdata)) {
			  return Redirect::intended('/dashboard');
			}
		  } 
		  else {
			// if any error send back with message.
			Session::flash('error', 'Something went wrong'); 
			return Redirect::to('/');
		  }
		}