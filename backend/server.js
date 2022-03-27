const mysql = require('mysql');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const dbConfig = require('./db.config');

const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const connection = mysql.createPool({
	connectionLimit: 1000,
	connectTimeout: 60 * 60 * 1000,
	acquireTimeout: 60 * 60 * 1000,
	timeout: 60 * 60 * 1000,
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
});

app.post('/addstudent', (req, res) => {
	let info = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		faculty: req.body.faculty,
		programme: req.body.programme,
		gender: req.body.gender,
	};
	const sql = 'INSERT INTO students SET ?';
	connection.query(sql, info, (err) => {
		if (err) {
			switch (err.errno) {
				case 1062:
					res.status(409).send();
					break;
			}
		} else {
			res.status(200).send();
		}
	});
});

app.get('/checkstudent', (req, res) => {
	const email = req.query.email;
	const sql = `SELECT password FROM students WHERE email=?`;
	connection.query(sql, [email], (err, result) => {
		if (err) {
			return;
		}
		if (result.length === 0) {
			res.status(500).send();
		} else {
			res.json(result[0].password);
		}
	});
});

app.get('/getGender', (req, res) => {
	const email = req.query.email;
	const sql = `SELECT gender FROM students WHERE email=?`;
	connection.query(sql, [email], (err, result) => {
		if (err) {
			res.status(400).send();
		}
		res.json(result[0].gender);
	});
});

// adds the students room
app.put('/addRoom', (req, res) => {
	const email = req.body.email;
	const room = req.body.room;
	const level = req.body.level;
	const sql = `UPDATE students set room=?, level=?  WHERE email=?`;
	connection.query(sql, [room, level, email], (err) => {
		if (err) {
			return;
		}
	});
});

app.get('/checkRoom', (req, res) => {
	const email = req.query.email;
	const sql = `SELECT room FROM students WHERE email=?`;
	connection.query(sql, [email], (err, result) => {
		if (err) {
			return err;
		}
		res.json(result);
	});
});

app.get('/getUnavailableRoomGirl', (req, res) => {
	const sql = `SELECT room from students WHERE gender='Female' AND room IS NOT NULL`;
	connection.query(sql, (err, result) => {
		if (err) {
			return err;
		}
		res.json(result);
	});
});

app.get('/getUnavailableRoomBoy', (req, res) => {
	const sql = `SELECT room from students WHERE gender='Male' AND room IS NOT NULL`;
	connection.query(sql, (err, result) => {
		if (err) {
			return;
		}
		res.json(result);
	});
});

app.listen(PORT, () => {
	return `Server is running on PORT ${PORT}`;
});
