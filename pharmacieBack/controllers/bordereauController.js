const Borderau = require('../models/borderau');
const Ordonnnance = require('../models/ordonnance');

exports.generateBorderau = async (req, res) => {
  try {
    const { ordonnanceIds } = req.body;

    const ordonnances = await Ordonnnance.find({ _id: { $in: ordonnanceIds } });

    const montantTotal = ordonnances.reduce((total, ordonnance) => total + ordonnance.montantTotal, 0);
    const montantTotalRemboursable = ordonnances.reduce((total, ordonnance) => total + ordonnance.montantTotalRemboursable, 0);

    const newBorderau = await Borderau.create({
      numero: generateNumero(),
      nombreOrdonnance: ordonnances.length,
      dateGenerationB: new Date(),
      montantTotal,
      montantTotalRemboursable,
      etat: false,
      state: 'En cours',
      ordonnances: ordonnanceIds,
    });

    await Ordonnnance.updateMany({ _id: { $in: ordonnanceIds } }, { $set: { etat: true } });

    res.status(201).json(newBorderau);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

function generateNumero() {

    const timestamp = Date.now().toString();
    const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `Bor-${timestamp}-${randomSuffix}`;
 
}


exports.findAllBorderau = async (req, res) => {
    try {
      const borderaux = await Borderau.find().populate('ordonnances');
      res.json(borderaux);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  exports.findBorderauById = async (req, res) => {
    try {
      const borderauId = req.params.borderauId;
      const borderau = await Borderau.findById(borderauId).populate('ordonnances');
  
      if (!borderau) {
        return res.status(404).json({ message: 'Borderau not found' });
      }

      res.json(borderau);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


exports.changeEtatBorderau = async (req, res) => {
  try {
    const borderauId = req.params.borderauId;
    const bordereau = await Borderau.findByIdAndUpdate(
      borderauId,
      {
        etat: true,
        state: 'réglé',
      },
      { new: true }
    );

    if (!bordereau) {
      throw new Error("Bordereau not found");
    }

    res.json(bordereau);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.changeEtatBorderaufalse = async (req, res) => {
  try {
    const borderauId = req.params.borderauId;
    const bordereau = await Borderau.findByIdAndUpdate(
      borderauId,
      {
        etat: false,
        state: 'En cours',
      },
      { new: true }
    );

    if (!bordereau) {
      throw new Error("Bordereau not found");
    }

    res.json(bordereau);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





   
