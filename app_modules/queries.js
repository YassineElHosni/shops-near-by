
function db_tables(tables){
	this.tables = tables;
}

const db_shops = new db_tables({
	user: "user",
	shops: "shops",
	shops_liked: "liked_shops",
	shops_disliked: "disliked_shops"
});

exports.get = {
	SQL_INSERT_USER: "INSERT INTO `" + db_shops.tables.user + "`(`email`,`password`) VALUES (?, ?);",
	SQL_SELECT_USER_BY_EMAIL_PW: "SELECT * FROM `" + db_shops.tables.user + "` WHERE `email` = ? and password = ?;",
	SQL_SELECT_SHOPS_NEAR_ME: "SELECT id, name, latitude, longitude, "
								+"SQRT( POW(69.1 * (latitude - ?), 2) + "
								+"POW(69.1 * (? - longitude) * COS(latitude / 57.3), 2)) * 1609.34 AS distance "
							+"FROM `" + db_shops.tables.shops + "` "
							+"WHERE id not in "
								+"(SELECT `shop_id` FROM `" + db_shops.tables.shops_liked + "` WHERE `user_id` = ? UNION "
								+"SELECT `shop_id` FROM `" + db_shops.tables.shops_disliked + "` WHERE `user_id` = ?) "
							+"HAVING distance < 1000 ORDER BY distance;",
	SQL_INSERT_LIKED_SHOP_BY_USER: "INSERT INTO `" + db_shops.tables.shops_liked + "`(`shop_id`, `user_id`) VALUES(?, ?);",
	SQL_INSERT_DISLIKED_SHOP_BY_USER: "INSERT INTO `" + db_shops.tables.shops_disliked + "`(`shop_id`, `user_id`) VALUES(?, ?);",
	SQL_DELETE_DISLIKED_SHOP_ADDED_TWO_HOURS_AGO: "DELETE FROM `" + db_shops.tables.shops_disliked + "` "
		+"WHERE time_format(timediff(CURRENT_TIMESTAMP, dislike_date),'%H') >= 2;",
	SQL_SELECT_PREFERED_SHOPS: "SELECT id, name, latitude, longitude, "
								+"SQRT( POW(69.1 * (latitude - ?), 2) + "
								+"POW(69.1 * (? - longitude) * COS(latitude / 57.3), 2)) * 1609.34 AS distance "
							+"FROM `" + db_shops.tables.shops + "` "
							+"WHERE id in "
								+"(SELECT `shop_id` FROM `" + db_shops.tables.shops_liked + "` WHERE `user_id` = ?);",
	SQL_DELETE_LIKED_SHOP: "DELETE FROM `" + db_shops.tables.shops_liked + "` WHERE shop_id = ? and user_id = ?;"
};