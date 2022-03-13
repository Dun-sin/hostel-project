const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'dunsin12345',
	database: 'testing2',
});

connection.connect((err) => {
	if (err) {
		throw err;
	}
});

app.get('/addstudent', (req, res) => {
	let info = {
		firstName: req.query.fName,
		lastName: req.query.lName,
		email: req.query.email,
		password: req.query.password,
		faculty: req.query.faculty,
		programme: req.query.programme,
		gender: req.query.gender,
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
	const password = req.query.password;
	const sql = `SELECT password FROM students WHERE email = ?`;
	connection.query(sql, [email], (err, result) => {
		if (err) {
			return;
		}
		if (result.length === 0) {
			res.status(500).send();
		} else {
			if (result[0].password === password) {
				res.status(200).send();
			} else {
				res.status(502).send();
			}
		}
	});
});

app.get('/getGender', (req, res) => {
	const email = req.query.email;
	const sql = `SELECT gender FROM students WHERE email = ?`;
	connection.query(sql, [email], (err, result) => {
		if (err) {
			res.status(400).send();
		}
		res.json(result[0].gender);
	});
});

// adds the students room
app.get('/addRoom', (req, res) => {
	const email = req.query.email;
	const room = req.query.room;
	const level = req.query.level;
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
			result;
		}
		res.json(result);
	});
});

app.listen('4000', () => {
	console.log('Server Started Sucessfull');
});
