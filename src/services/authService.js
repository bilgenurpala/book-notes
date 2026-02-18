const bcrypt = require('bcrypt');
const db = require('../config/database');
const logger = require('../config/logger');

class AuthService {
  async register(userData) {
    const { username, email, password, language = 'en' } = userData;

    try {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_ROUNDS) || 10
      );

      const result = await db.raw(
        `INSERT INTO users (username, email, password_hash, language, created_at)
         VALUES (?, ?, ?, ?, NOW())
         RETURNING id, username, email, language, created_at`,
        [username, email, hashedPassword, language]
      );

      logger.info('New user registered:', { username, email });
      return result.rows[0];
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  async login(identifier, password) {
    try {
      const isEmail = identifier.includes('@');
      const result = await db.raw(
        `SELECT id, username, email, password_hash, language FROM users WHERE ${isEmail ? 'email' : 'username'} = ?`,
        [identifier]
      );

      if (result.rows.length === 0) {
        return { success: false, message: 'Invalid email or password' };
      }

      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return { success: false, message: 'Invalid email or password' };
      }

      const { password_hash, ...userWithoutPassword } = user;
      logger.info('User logged in:', { username: user.username, email: user.email });

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const result = await db.raw(
        'SELECT id, username, email, language, created_at FROM users WHERE id = ?',
        [userId]
      );

      return result.rows[0] || null;
    } catch (error) {
      logger.error('Get user error:', error);
      throw error;
    }
  }

  async updateLanguage(userId, language) {
    try {
      const result = await db.raw(
        'UPDATE users SET language = ? WHERE id = ? RETURNING id, username, email, language',
        [language, userId]
      );

      return result.rows[0];
    } catch (error) {
      logger.error('Update language error:', error);
      throw error;
    }
  }
}

module.exports = new AuthService();
