const Adherant = require("../models/adherant");
const Assurance = require("../models/assurance");

exports.createAdherantInAssurance = async (req, res) => {
  try {
    const assuranceId = req.body.assuranceId;
    const assurance = await Assurance.findById(assuranceId);

    if (!assurance) {
      return res.status(404).json({ message: "Assurance non trouvée" });
    }
    const {
      nom,
      prenom,
      cin,
      matricule,
      telephone,
      dateNaissance,
      paysNaissance,
    } = req.body;
    const newAdherant = new Adherant({
      nom,
      prenom,
      cin,
      matricule,
      telephone,
      dateNaissance,
      paysNaissance,
      assurance: assurance,
    });

    await newAdherant.save();

    const createdAdherant = await Adherant.findById(newAdherant._id);

    res.status(201).json({
      message: 'Adherant créé avec succès',
      adherant: createdAdherant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateAdherant = async (req, res) => {
  try {
    const adherantId = req.params.adherantId;
    const adherant = await Adherant.findById(adherantId);

    if (!adherant) {
      return res.status(404).json({ message: 'Adherant non trouvé' });
    }

    adherant.nom = req.body.nom || adherant.nom;
    adherant.prenom = req.body.prenom || adherant.prenom;
    adherant.cin = req.body.cin || adherant.cin;
    adherant.matricule = req.body.matricule || adherant.matricule;
    adherant.telephone = req.body.telephone || adherant.telephone;
    adherant.dateNaissance = req.body.dateNaissance || adherant.dateNaissance;
    adherant.paysNaissance = req.body.paysNaissance || adherant.paysNaissance;

    await adherant.save();

    const updatedAdherant = await Adherant.findById(adherantId);

    res.status(200).json({
      message: 'Adherant modifié avec succès',
      adherant: updatedAdherant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAdherantById = async (req, res) => {
  try {
    const adherantId = req.params.adherantId;
    const adherant = await Adherant.findById(adherantId).populate('assurance');

    if (!adherant) {
      return res.status(404).json({ message: 'Adherant not found' });
    }
    res.status(200).json(adherant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllAdherants = async (req, res) => {
    try {
      const adherants = await Adherant.find().populate('assurance');
      res.status(200).json(adherants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.deleteAdherant = async (req, res) => {
    try {
      const adherantId = req.params.adherantId;
      const adherant = await Adherant.findByIdAndDelete(adherantId);
      if (!adherant) {
        return res.status(404).json({ message: 'Adherant not found' });
      }
      res.status(200).json({ message: 'Adherant deleted successfully', deletedAdherant: adherant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



  exports.findAdherantsByAssuranceName = async (req, res) => {
    try {
      const assuranceName = req.params.assuranceName;
      const assurance = await Assurance.findOne({ nom: assuranceName });
  
      if (!assurance) {
        return res.status(404).json({ message: 'Assurance not found' });
      }
  
      const adherants = await Adherant.find({ assurance: assurance._id });
  
      res.status(200).json({ adherants });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.findAdherantByAssuranceId = async (req , res) =>
  {

    try {
        const assuranceId = req.params.assuranceId;
        const adherants = await Adherant.find({ assurance: assuranceId });
        res.status(200).json({ adherants });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

  }

  exports.getAllAssuranceNames = async (req, res) => {
    try {
      const assuranceNames = await Assurance.distinct('nom');
      res.status(200).json(assuranceNames);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

 




