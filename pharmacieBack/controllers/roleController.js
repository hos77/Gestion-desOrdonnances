const Role = require('../models/role');

exports.addRole = async (req, res) => {
  try {
    const { type } = req.body;
    const existingRole = await Role.findOne({ type });
    if (existingRole) {
      return res.status(400).json({ error: 'Role with this type already exists' });
    }
    const newRole = new Role({ type });
    await newRole.save();

    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
