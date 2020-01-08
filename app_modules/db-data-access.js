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

			deleteDislikedShopAddedTwoHourAgo(user.id);

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
function insertLikedShopByUser(shop_id, user_id, response){
	var callee_name = arguments.callee.name;
	file_log("routes.user." + callee_name, "called by user n° " + user_id);
	db.query(queries.get.SQL_INSERT_LIKED_SHOP_BY_USER,
		[
			shop_id,
			user_id
		],
	function(error, result) {
		if(error) throw error;
		file_log("routes.user." + callee_name, "user n° " + user_id + " succesfully liked shop n° " + shop_id);
		response.send(JSON.stringify({
			error: false,
			message: "Succesfully liked the given shop!"
		}));
	});
}
function insertDislikedShopByUser(shop_id, user_id, response){
	var callee_name = arguments.callee.name;
	file_log("routes.user." + callee_name, "called by user n° " + user_id);
	db.query(queries.get.SQL_INSERT_DISLIKED_SHOP_BY_USER,
		[
			shop_id,
			user_id
		],
	function(error, result) {
		if(error) throw error;
		file_log("routes.user." + callee_name, " user n° " + user_id + " succesfully disliked shop n° " + shop_id);
		response.send(JSON.stringify({
			error: false,
			message: "Succesfully disliked the given shop!"
		}));
	});
}
function deleteDislikedShopAddedTwoHourAgo(user_id){
	var callee_name = arguments.callee.name;
	file_log("routes.user." + callee_name, "called by user " + user_id);
	file_log("routes.user." + callee_name, "reseting disliked shops if inserted before 2hour from now");
	db.query(queries.get.SQL_DELETE_DISLIKED_SHOP_ADDED_TWO_HOURS_AGO,
	function(error, results){
		if(error)
			throw error;
		else{
			file_log("routes.user." + callee_name, "succesfully removed some disliked shops");
			file_log(results);
		}
	}); 
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
				message: "succesfully loaded data!"
			}));
		});
}
function selectPreferedShops(user, response){
	var callee_name = arguments.callee.name;
	file_log("routes.user." + callee_name, "called by user n° " + user.id);
	db.query(queries.get.SQL_SELECT_PREFERED_SHOPS,
		[
			user.location.latitude,
			user.location.longitude,
			user.id
		],
	function(error, results){
		if(error) throw error;
		file_log("routes.user." + callee_name, "succesfully loaded prefered shops for user n° " + user.id);

		response.send(JSON.stringify({
			error: false,
			data: {
				user: user,
				shops: results
			},
			message: "succesfully loaded data!"
		}));
	});
}
exports.insertUser = insertUser;
exports.requestCurrentLocationFromUser = requestCurrentLocationFromUser;
exports.selectShopsNearMe = selectShopsNearMe;
exports.selectUserByEmailPw = selectUserByEmailPw;
exports.insertLikedShopByUser = insertLikedShopByUser;
exports.insertDislikedShopByUser = insertDislikedShopByUser;
exports.deleteDislikedShopAddedTwoHourAgo = deleteDislikedShopAddedTwoHourAgo;
exports.selectPreferedShops = selectPreferedShops;
