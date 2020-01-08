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
function requestCurrentLocationFromUser(user_id){
	file_log("routes.user."+arguments.callee.name, "requeting current location from user n° " + user_id);
	// TODO: request/get latitude and longitude from the user.
	let latitude = 34.003243399999995
		,longitude = -6.8487546;
	file_log("routes.user." + arguments.callee.name, "user position: latitude=" + latitude + ", longitude=" + longitude);
	return {latitude, longitude};
}
function selectShopsNearMe(user, response){
	var callee_name = arguments.callee.name;
	file_log("routes.user." + callee_name, "called by user n° " + user.id);
	db.query(queries.get.SQL_SELECT_SHOPS_NEAR_ME,
		[
			user.location.latitude,
			user.location.longitude,
			user.id,
			user.id
		],
	function(error, results){
		if(error) throw error;
		file_log("routes.user." + callee_name, "succesfully loaded near by shops for user n° " + user.id);

		response.send(JSON.stringify({
			error: false,
			data: {
				user: user,
				shops: results
			},
			message: "Succesfully loaded data!"
		}));
	});
}
function selectUserByEmailPw(user, request, response){
	var callee_name = arguments.callee.name;
	db.query(queries.get.SQL_SELECT_USER_BY_EMAIL_PW,
		[
			user.email,
			user.password
		],
	function(error, results){
		if(error) throw error;
		if(results.length == 1){
			user.copyUser(results[0]);
			request.session.user = user.toRequiredObject();

			file_log("routes.user." + callee_name, "user n° " + user.id + " succesfully signed in");

			user.location = requestCurrentLocationFromUser(user.id);

			file_log("routes.user." + callee_name, "requesting shops near user n° " + user.id);
			selectShopsNearMe(user, response);
		}
		else{
			file_log("routes.user." + callee_name, "Wrong Credentials", "ERROR");
				response.send(JSON.stringify({
				error: true,
				message: "Wrong credentials!"
			}));
		}
	});
}
exports.insertUser = insertUser;
exports.requestCurrentLocationFromUser = requestCurrentLocationFromUser;
exports.selectShopsNearMe = selectShopsNearMe;
exports.selectUserByEmailPw = selectUserByEmailPw;