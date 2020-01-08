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
exports.likeShop = likeShop;