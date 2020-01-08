/*
* Module dependencies.
*/
var express = require('express')
	,session = require('express-session')
	// ,http = require('http')
	,path = require('path')
	,multer = require("multer")
	,bodyParser = require("body-parser")
	,fs = require('fs')
	,util = require('util')
	,mysql = require('mysql')
	,multerData = multer()
	,app = express()
	,connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'db_shops'
	})
	,log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});

connection.connect();
global.db = connection;

app.set('port', process.env.PORT || 8081);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1800000 } // 30min
	}));

app.listen(9096);

global.file_log = function (method, message, type = "INFO") { //
	var date_time_now = new Date().toISOString().
		replace(/T/, ' '). // replace T with a space
		replace(/\..+/, ''); // delete the dot and everything after

	var line = date_time_now + " " + type + " ? " + method + " : " + message;
	console.log("[log] " + line);
	log_file.write(util.format(line) + '\n');
};