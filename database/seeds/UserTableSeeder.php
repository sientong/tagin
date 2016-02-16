<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$users = array(['id' => 1, 'name' => 'admin', 'email' => 'admin@tagin.com', 'password' => 'password']);
		
		DB::table('users') -> insert($users);
    }
}
