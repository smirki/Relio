const express = require('express');
const app = express();
const path = require('path');

// Define routes for the static files
app.use('/components/css', express.static(path.join(__dirname, 'components/css')));
app.use('/components/js', express.static(path.join(__dirname, 'components/js')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));
app.use(express.static(path.join(__dirname, 'pages')));

// Define a route for the index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
