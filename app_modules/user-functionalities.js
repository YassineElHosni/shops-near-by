/*
* Module dependencies.
*/
var db_request = require('./db-data-access');


function User(email, password){
   this.id = null;
   this.email = email;
   this.password = password;

   // TODO: crypt user password
}

function signup(request, response){
	var user = new User(
		request.body.email,
		request.body.password
	);
	db_request.insertUser(user, response);
};

exports.signup = signup;