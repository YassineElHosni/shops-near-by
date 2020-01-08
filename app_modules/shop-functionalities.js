/*
* Module dependencies.
*/
var db_request = require('./db-data-access');

function likeShop(request, response){

	db_request.insertLikedShopByUser(
		parseInt(request.body.shop_id),
		request.session.user.id,
		response
	);
};
function dislikeShop(request, response){
	db_request.insertDislikedShopByUser(
		parseInt(request.body.shop_id),
		request.session.user.id,
		response
	);
};
function nearByShops(request, response){
	var user =  request.session.user;

	file_log("routes.user." + arguments.callee.name, "requeting user position");
	user.location = db_request.requestCurrentLocationFromUser();

	db_request.deleteDislikedShopAddedTwoHourAgo(user.id);

	file_log("routes.user." + arguments.callee.name, "requesting near by shops");
	db_request.selectShopsNearMe(user, response);
};
function preferedShops(request, response){
	var user =  request.session.user;

	file_log("routes.user." + arguments.callee.name, "requeting user position");
	user.location = db_request.requestCurrentLocationFromUser();

	db_request.deleteDislikedShopAddedTwoHourAgo(user.id);

	file_log("routes.user." + arguments.callee.name, "requested shops for user n° "+user.id+".");
	db_request.selectPreferedShops(user, response);  
};
exports.likeShop = likeShop;
exports.dislikeShop = dislikeShop;
exports.nearByShops = nearByShops;
exports.preferedShops = preferedShops;