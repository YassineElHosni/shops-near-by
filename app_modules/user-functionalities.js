/*
* Module dependencies.
*/
var db_request = require('./db-data-access');


function User(email, password){
   this.id = null;
   this.email = email;
   this.password = password;
   this.location = {};

   // TODO: crypt user password

   this.copyUser = async(user) => {
      this.id = user.id;
      this.email = user.email;
      this.password = user.password;
      //await this.cryptUserPassword();

   }
   this.toRequiredObject = function(){
      return {
         id: this.id,
         email: this.email,
         password: this.password
      };
   }
}

function signup(request, response){
	var user = new User(
		request.body.email,
		request.body.password
	);
	db_request.insertUser(user, response);
};

function signin(request, response){
	var user = new User(
		request.body.email,
		request.body.password
	);
	db_request.selectUserByEmailPw(user, request, response);
};
function signout(request, response){
	var user_id = request.session.user.id;
	var callee_name = arguments.callee.name;
	file_log("routes.user." + callee_name, "signing out user n° " + user_id);
	request.session.destroy(function(error) {
		file_log("routes.user." + callee_name, "user n° " + user_id + " signout succesfully");

		response.send(JSON.stringify({
			error: false,
			message: "Signout succesfully!"
		}));
	})
};

exports.signup = signup;
exports.signin = signin;
exports.signout = signout;