// Import required packages
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Initialize the application
const app = express();

// Create a new SQLite database connection
const db = new sqlite3.Database('./database.db');

// Create a table to store user credentials
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL)');
});

// Set up middleware to parse incoming requests as JSON
app.use(express.json());

// Set up a route to handle user authentication
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database
  db.get('SELECT * FROM users WHERE username = ?', username, (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!row) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the submitted password to the hashed password in the database
    bcrypt.compare(password, row.password, (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // If the credentials are valid, create a JSON Web Token and return it to the client
      const token = jwt.sign({ id: row.id }, 'my_secret_key', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// Set up a route to handle API requests
app.get('/data', (req, res) => {
  // Verify the authentication token
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'my_secret_key', (err, decoded) => {
    if (err) {
      console.error(err.message);
      return res.status(401).json({ message: 'Invalid authorization token' });
    }

    // Query the database and return the results as JSON
    db.all('SELECT * FROM my_table', (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.json(rows);
    });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
