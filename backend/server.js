const mysql = require('mysql');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const dbConfig = require('./db.config');

const cors = require('cors');
const corsOptions = {
	origin: ['http://localhost:5500/'],
	credentials: true,
	methods: 'GET',
};

app.use(cors(corsOptions));

const connection = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
});

// connection.connect((err) => {
// 	if (err) {
// 		throw err;
// 	}
// });

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
			return err;
		}
		res.json(result);
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
