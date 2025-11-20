const express = require('express');
const cors = require('cors');
const connectToDB = require('./db');
require('dotenv').config();
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('server work nice');
});

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.Secret,
  store: MongoStore.create({
    mongoUrl: process.env.Mondo_URL,
  }),
  resave: false,
  saveUninitialized: false
}));

app.use('/api', require('./routes/ads.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});