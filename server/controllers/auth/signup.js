// const mssql = require('mssql');
// const bcrypt = require('bcryptjs');
// const dbConfig = require('../../config/db');

// // Sign up controller
// const signUpUser = async (req, res) => {
//   const { fullName, email, password } = req.body;

//   // Basic validation
//   if (!fullName || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ message: 'Invalid email format' });
//   }

//   if (password.length < 6) {
//     return res.status(400).json({ message: 'Password must be at least 6 characters' });
//   }

//   try {
//     const pool = await mssql.connect(dbConfig);

//     // Check if email already exists
//     const result = await pool.request()
//       .input('email', mssql.NVarChar, email)
//       .query('SELECT * FROM Users WHERE email = @email');

//     if (result.recordset.length > 0) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert the new user into the database
//     await pool.request()
//       .input('fullName', mssql.NVarChar, fullName)
//       .input('email', mssql.NVarChar, email)
//       .input('password', mssql.NVarChar, hashedPassword)
//       .query('INSERT INTO Users (fullName, email, password) VALUES (@fullName, @email, @password)');

//     res.status(201).json({ message: 'Sign up successful' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// };

// module.exports = { signUpUser };
