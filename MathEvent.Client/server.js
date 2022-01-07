/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

console.log(`The server is running on ${port}!`);

app.listen(port);
