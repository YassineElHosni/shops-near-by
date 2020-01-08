
function db_tables(tables){
	this.tables = tables;
}

const db_shops = new db_tables({
	user: "user"
});

exports.get = {
	SQL_INSERT_USER: "INSERT INTO `" + db_shops.tables.user + "`(`email`,`password`) VALUES (?, ?);"
};