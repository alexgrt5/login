const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'mi_secreto_secreto',
  resave: false,
  saveUninitialized: true
}));

// BD Simulated
const users = [
    {
        id: 1,
        username: 'admin',
        // password: '1234'
        passwordHash: bcrypt.hashSync('1234', 10)
    }
];