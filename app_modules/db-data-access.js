/*
* Module dependencies.
*/
var queries = require('./queries');

function insertUser(user, response){
	var callee_name = arguments.callee.name;
	db.query(queries.get.SQL_INSERT_USER,
		[
			user.email,
			user.password
		],
	function(error, result) {
		if(error) throw error;
		file_log("routes.user." + callee_name, "user account created succesfully");
		response.send(JSON.stringify({
			error: false,
			message: "User account created succesfully!"
		}));
	});
}
exports.insertUser = insertUser;