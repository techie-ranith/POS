const mssql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConfig = require('../../config/db');



const login = async (req, res) => {
    const { email, password } = req.body;
  
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const pool = await mssql.connect(dbConfig);
  
      // Check if user exists
      const result = await pool.request()
        .input('email', mssql.NVarChar, email)
        .query('SELECT * FROM Users WHERE email = @email');
  
      if (result.recordset.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const user = result.recordset[0];
  
      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'your_jwt_secret', // Use a proper secret key in production
        { expiresIn: '1h' } // Token expiration time
      );
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };
  
  module.exports = { login };