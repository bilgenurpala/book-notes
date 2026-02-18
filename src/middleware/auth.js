const attachUser = (req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
};

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash('error', res.__('auth.loginRequired'));
  res.redirect('/auth/login');
};

const isGuest = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  res.redirect('/dashboard');
};

module.exports = {
  attachUser,
  isAuthenticated,
  isGuest,
};
