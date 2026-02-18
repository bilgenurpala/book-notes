const authService = require('../services/authService');
const logger = require('../config/logger');

exports.registerPage = (req, res) => {
  res.render('auth/register', {
    layout: false,
    title: res.__('register.title'),
    locale: req.getLocale(),
  });
};

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await authService.register({ username, email, password });

    logger.info('User registered successfully:', { userId: user.id, username });
    req.flash('success', res.__('auth.registerSuccess'));
    res.redirect('/auth/login');
  } catch (err) {
    if (err.code === '23505') {
      req.flash('error', res.__('auth.registerDuplicate'));
      return res.redirect('/auth/register');
    }

    logger.error('Registration error:', err);
    req.flash('error', res.__('auth.registerFailed'));
    res.redirect('/auth/register');
  }
};

exports.loginPage = (req, res) => {
  const extraSuccess = req.query.loggedOut === '1' ? res.__('auth.logoutSuccess') : null;
  const flashSuccess = req.flash('success');
  const success = extraSuccess || (flashSuccess.length > 0 ? flashSuccess : '');

  res.render('auth/login', {
    layout: false,
    title: res.__('login.title'),
    locale: req.getLocale(),
    success,
    error: req.flash('error'),
  });
};

exports.login = async (req, res, next) => {
  const { identifier, password } = req.body;

  try {
    const result = await authService.login(identifier, password);

    if (!result.success) {
      req.flash('error', res.__('auth.invalidCredentials'));
      return res.redirect('/auth/login');
    }

    req.session.user = {
      id: result.user.id,
      username: result.user.username,
      email: result.user.email,
      language: result.user.language || 'en',
    };

    logger.info('User logged in:', { userId: result.user.id, username: result.user.username });
    req.flash('success', res.__('auth.welcomeBack', result.user.username));
    res.redirect('/dashboard');
  } catch (err) {
    logger.error('Login error:', err);
    req.flash('error', res.__('auth.loginFailed'));
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  const username = req.session.user?.username;

  req.session.destroy((err) => {
    if (err) {
      logger.error('Logout error:', err);
      return res.redirect('/dashboard');
    }

    logger.info('User logged out:', { username });
    res.clearCookie('connect.sid');
    res.redirect('/auth/login?loggedOut=1');
  });
};
