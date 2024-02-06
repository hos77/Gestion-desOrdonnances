const Assurance = require('../models/assurance');

exports.createAssurance = async (req, res) => {
  try {
    const { nom } = req.body;
    if (!nom) {
      return res.status(400).json({ message: 'Nom is required' });
    }
    const newAssurance = new Assurance({ nom });
    const savedAssurance = await newAssurance.save();
    res.status(201).json(savedAssurance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateAssurance = async (req, res) => {
    try {
      const { nom } = req.body;
      const { assuranceId } = req.params;
  
      if (!nom) {
        return res.status(400).json({ message: 'Nom is required' });
      }
      const updatedAssurance = await Assurance.findByIdAndUpdate(
        assuranceId,
        { nom },
        { new: true }
      );
      if (!updatedAssurance) {
        return res.status(404).json({ message: 'Assurance not found' });
      }
      res.status(200).json(updatedAssurance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.findAllAssurances = async (req, res) => {
    try {
      const assurances = await Assurance.find();
      res.status(200).json(assurances);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  exports.findAssuranceById = async (req, res) => {
    try {
      const assuranceId = req.params.assuranceId;
      const assurance = await Assurance.findById(assuranceId);
      if (!assurance) {
        return res.status(404).json({ message: 'Assurance non trouvée' });
      }
  
      res.status(200).json(assurance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.deleteAssurance = async (req, res) => {
    try {
      const assuranceId = req.params.assuranceId;
      const assurance = await Assurance.findByIdAndDelete(assuranceId);
  
      if (!assurance) {
        return res.status(404).json({ message: 'Assurance non trouvée' });
      }
  
      res.status(200).json({ message: 'Assurance supprimée avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };





