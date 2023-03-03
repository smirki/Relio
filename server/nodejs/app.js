const express = require('express');
const sqlite3 = require('sqlite3');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Check if database file exists
const dbFile = './relio_db.sqlite';
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log(`Connected to the Relio database: ${dbFile}`);
});

// Create tables if they do not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    email TEXT,
    password TEXT,
    date_created TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    contact_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    name TEXT,
    relationship TEXT,
    company TEXT,
    position TEXT,
    email TEXT,
    phone_number TEXT,
    date_added TEXT,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS reminders (
    reminder_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    contact_id INTEGER,
    reminder_type TEXT,
    reminder_date TEXT,
    reminder_notes TEXT,
    reminder_status TEXT,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(contact_id) REFERENCES contacts(contact_id)
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    task_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    task_description TEXT,
    task_due_date TEXT,
    task_notes TEXT,
    task_status TEXT,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS activity_types (
    activity_type_id INTEGER PRIMARY KEY,
    activity_type_description TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS activities (
    activity_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    contact_id INTEGER,
    activity_type_id INTEGER,
    activity_date TEXT,
    activity_notes TEXT,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(contact_id) REFERENCES contacts(contact_id),
    FOREIGN KEY(activity_type_id) REFERENCES activity_types(activity_type_id)
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS groups (
    group_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    group_name TEXT,
    group_description TEXT,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS group_members (
    group_member_id INTEGER PRIMARY KEY,
    group_id INTEGER,
    contact_id INTEGER,
    FOREIGN KEY(group_id) REFERENCES groups(group_id),
    FOREIGN KEY(contact_id) REFERENCES contacts(contact_id)
  )`);
});

// Create SQLite3 file if it does not exist
const fs = require('fs');
if (!fs.existsSync(dbFile)) {
  db.close();
  fs.openSync(dbFile, 'w');
  const newDb = new sqlite3.Database(dbFile);
  console.log(`Created new Relio database file: ${dbFile}`);
}

// Set up session middleware
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

// Set up middleware to parse JSON data
app.use(express.json());

// Middleware to check if user is authenticated
const checkAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Signup route
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/views/signup.html');
});

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    
    db.run(`INSERT INTO users (username, email, password, date_created) 
            VALUES (?, ?, ?, ?)`, [username, email, hash, new Date()], (err) => {
      if (err) throw err;
      
      res.redirect('/login');
    });
  });
});

// Login route
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get(`SELECT user_id, email, password FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) throw err;
    
    if (!row) {
      res.status(400).json({ error: 'Invalid email or password' });
    } else {
      bcrypt.compare(password, row.password, (err, result) => {
        if (err) throw err;
        
        if (result) {
          req.session.user_id = row.user_id;
          res.redirect('/dashboard');
        } else {
          res.status(400).json({ error: 'Invalid email or password' });
        }
      });
    }
  });
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

// Dashboard route
app.get('/dashboard', checkAuth, (req, res) => {
  db.all(`SELECT * FROM contacts WHERE user_id = ?`, [req.session.user_id], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Relio server listening at http://localhost:${port}`);
});
