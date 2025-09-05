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

// BD simulated
const users = [
  {
    id: 1,
    username: 'admin',
    // Password: "1234"
    passwordHash: bcrypt.hashSync('1234', 10)
  }
];

// Routes
app.get('/', (req, res) => {
  if (req.session.userId) {
    res.send(`Hi, you are logged in as ${req.session.username}. <a href="/logout">Logout</a>`);
  } else {
    res.send(`
      <h2>Login</h2>
      <form method="POST" action="/login">
        Username: <input name="username" /><br/>
        Password: <input type="password" name="password" /><br/>
        <button>Login</button>
      </form>
    `);
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.send('User not found.');
  }

  const passwordMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordMatch) {
    return res.send('Invalid password..');
  }

  req.session.userId = user.id;
  req.session.username = user.username;
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
