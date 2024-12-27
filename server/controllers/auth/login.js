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

    const result = await pool.request()
      .input('email', mssql.NVarChar, email)
      .query(`
        IF EXISTS (SELECT 1 FROM Admin WHERE email = @email)
        BEGIN
            SELECT  * FROM Admin WHERE email = @email
        END
        ELSE
        BEGIN
            SELECT  * FROM Employee WHERE email = @email
        END
      `);

    if (result.recordset.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result.recordset[0];  

    
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    
    const token = jwt.sign(
      { userId: user.id, email: user.Email, role: user.Role },
      'your_jwt_secret',  
      { expiresIn: '1h' } 
    );


    res.status(200).json({
      message: 'Login successful',
      token,
      redirectTo: user.Role === 'Admin' ? '/admin' : '/employee',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { login };
