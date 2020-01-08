
function db_tables(tables){
	this.tables = tables;
}

const db_shops = new db_tables({
	user: "user",
	shops: "shops"
});

exports.get = {
	SQL_INSERT_USER: "INSERT INTO `" + db_shops.tables.user + "`(`email`,`password`) VALUES (?, ?);",
	SQL_SELECT_USER_BY_EMAIL_PW: "SELECT * FROM `" + db_shops.tables.user + "` WHERE `email` = ? and password = ?;",
	SQL_SELECT_SHOPS_NEAR_ME: "SELECT id, name, latitude, longitude, "
								+"SQRT( POW(69.1 * (latitude - ?), 2) + "
								+"POW(69.1 * (? - longitude) * COS(latitude / 57.3), 2)) * 1609.34 AS distance "
							+"FROM `" + db_shops.tables.shops + "` "
							+"HAVING distance < 1000 ORDER BY distance;"
};