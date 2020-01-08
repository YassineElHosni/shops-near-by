/*
* Module dependencies.
*/
var db_request = require('./db-data-access');


function User(email, password){
   this.id = null;
   this.email = email;
   this.password = password;

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

exports.signup = signup;
exports.signin = signin;