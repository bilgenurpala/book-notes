const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.registerPage = (req, res) => {
    res.render('auth/register', { layout: false });
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            req.flash('error', 'Email already registered');
            return res.redirect('/auth/register');
        }

        const hash = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)',
            [username, email, hash]
        );
        req.flash('success', 'Account created successfully! Please login.');
        res.redirect('/auth/login');
    } catch (err) {
        console.log(err);
        req.flash('error', 'Registration failed: ' + err.message);
        res.redirect('/auth/register');
    }
};

exports.loginPage = (req, res) => {
    res.render('auth/login', { layout: false });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            req.flash('error', 'User not found');
            return res.redirect('/auth/login');
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password_hash);

        if (match) {
            req.session.user = { 
                id: user.id, 
                username: user.username,
                language: user.language || 'en'
            };
            req.flash('success', 'Welcome back, ' + user.username + '!');
            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Wrong password');
            res.redirect('/auth/login');
        }
    } catch (err) {
        req.flash('error', 'Login failed: ' + err.message);
        res.redirect('/auth/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};
