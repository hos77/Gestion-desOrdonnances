const User = require('../models/user');
const Role = require('../models/role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
      const { nom, prenom, username, email, password, telephone, matriculeC, cin, adresse } = req.body;
  
      
  
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status  (400).json({ error: 'Username already in use' });
      }
  
      const user = new User({ nom, prenom, username, email, password, telephone, matriculeC, cin, adresse });
  
      const userRole = await Role.findOne({ type: 'user' });
      user.role = userRole._id;
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
  
      const token = jwt.sign({ _id: user._id, role: 'user' }, 'my secret key');
  
      res.header('auth-token', token).json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          role: 'user',
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  



exports.signIn = async (req, res) => {
    try {
      // Extract email and password from request body
      const { username, password } = req.body;
  
      // Check if the user with the provided email exists
      const user = await User.findOne({ username }).populate('role');
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password .............' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

    //   if (user.role && user.role.type !== 'user') {
    //     console.log('Unauthorized Role:', user.role.type);
    //     return res.status(403).json({ error: 'Unauthorized role' });
    //   }
  
      // If email and password are correct, generate a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        'my secret key',
        { expiresIn: '12h' }
      );
  
      // Send the token in the response
      res.json({ token ,user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.registerAdmin = async (req, res) => {
    try {
      const { nom, prenom, username, email, password, telephone, matriculeC, cin, adresse } = req.body;
  
      // Check if the email is already in use
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already in use' });
      }
  
      // Check if the username is already in use
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already in use' });
      }
  
      // Create a new admin user
      const user = new User({ nom, prenom, username, email, password, telephone, matriculeC, cin, adresse });
  
      const adminRole = await Role.findOne({ type: 'admin' });
      user.role = adminRole._id;
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      // Create and return a JWT token
      const token = jwt.sign({ _id: user._id, role: 'admin' }, 'my secret key');
  
      res.header('auth-token', token).json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          username:user.username,
          role: 'admin',
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


    exports.signInAdmin = async (req, res) => {
        try {
            const { email, password } = req.body;
        
            // Check if the admin with the provided email exists
            const admin = await User.findOne({ email }).populate('role');
            if (!admin) {
              return res.status(401).json({ error: 'Invalid email or password' });
            }
        
            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
              return res.status(401).json({ error: 'Invalid email or password' });
            }

            if (admin.role && admin.role.type !== 'admin') {
                console.log('Unauthorized Role:', admin.role.type);
                return res.status(403).json({ error: 'Unauthorized role' });
              }
        
            // If email and password are correct, generate a JWT token
            const token = jwt.sign(
              { adminId: admin._id, email: admin.email, role: 'admin' },
              'my secret key',
              { expiresIn: '12h' }
            );
        
            // Send the token in the response
            res.json({ token });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        };
    


