const Ordonnnance = require('../models/ordonnance');
const Adherant  = require('../models/adherant');
const Medicament = require('../models/medicament');

// exports.addOrdonnnance = async (req, res) => {
//   try {
//     const { adherentId, medicaments } = req.body;

//     const adherant = await Adherant.findById(adherentId);

//     if (!adherant) {
//         return res.status(404).json({ message: "adherant non trouvée" });
//       }
//     const numero = generateNumero();
//     const datePrescription = new Date()

//     let nombreMedTotale = 0;
//     let nombreMedRemboursable = 0;
//     let montantTotal = 0;
//     let montantTotalRemboursable = 0;

//     for (const medicamentId  of medicaments) {
//       const medicament = await Medicament.findById(medicamentId );

//       if (!medicament) {
//         return res.status(404).json({ message: 'Médicament non trouvé' });
//       }
//       nombreMedTotale++;
//       if (medicament.remboursable) {
//         nombreMedRemboursable++;
//         montantTotalRemboursable += medicament.prix;
//       }
//       montantTotal += medicament.prix;
      
//     }

//     const newOrdonnnance = await Ordonnnance.create({
//       numero,
//       datePrescription,
//       nombreMedTotale,
//       nombreMedRemboursable,
//       montantTotal,
//       montantTotalRemboursable,
//       etat: false, 
//       user: req.user.userId, 
//       adherent: adherentId,
//       medicaments:medicaments,
//     });

//     res.status(201).json(newOrdonnnance);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// Fonction utilitaire pour générer automatiquement le numéro de l'ordonnance
function generateNumero() {
    const timestamp = Date.now().toString();
    const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `ORD-${timestamp}-${randomSuffix}`;
  }


    exports.addOrdonnnance = async (req, res) => {
        try {
          // Extraire les données de la requête
          const { adherentId, medicamentNoms } = req.body;

          const adherant = await Adherant.findById(adherentId);

       if (!adherant) {
        return res.status(404).json({ message: "adherant non trouvée" });
         }
      
          const numero = generateNumero();
      
          const datePrescription = new Date();
      
          let nombreMedTotale = 0;
          let nombreMedRemboursable = 0;
          let montantTotal = 0;
          let montantTotalRemboursable = 0;
      
          for (const medicamentNom of medicamentNoms) {
            const medicament = await Medicament.findOne({ nom: medicamentNom });

            if (!medicament) {
              return res.status(404).json({ message: `Médicament "${medicamentNom}" non trouvé` });
            }

            nombreMedTotale++;

            if (medicament.remboursable) {
              nombreMedRemboursable++;
              montantTotalRemboursable += medicament.prix;
            }
            montantTotal += medicament.prix;
          }

          const medicaments = await Medicament.find({ nom: { $in: medicamentNoms } });
          const medicamentIds = medicaments.map(medicament => medicament._id);

      
          const newOrdonnnance = await Ordonnnance.create({
            numero,
            datePrescription,
            nombreMedTotale,
            nombreMedRemboursable,
            montantTotal,
            montantTotalRemboursable,
            etat: false, 
            user: req.user.userId,
            adherent: adherentId,
            medicaments: medicamentIds,
          });
      
          res.status(201).json(newOrdonnnance);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };

      exports.findAllOrdonnances = async (req, res) => {
        try {
          const ordonnances = await Ordonnnance.find();
          res.status(200).json(ordonnances);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
      
      exports.findOrdonnanceById = async (req, res) => {
        try {
          const ordonnanceId = req.params.ordonnanceId;
          const ordonnance = await Ordonnnance.findById(ordonnanceId);
      
          if (!ordonnance) {
            return res.status(404).json({ message: 'Ordonnance not found' });
          }
      
          res.status(200).json(ordonnance);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
      
      exports.deleteOrdonnance = async (req, res) => {
        try {
          const ordonnanceId = req.params.ordonnanceId;
          const deletedOrdonnance = await Ordonnnance.findByIdAndDelete(ordonnanceId);
      
          if (!deletedOrdonnance) {
            return res.status(404).json({ message: 'Ordonnance not found' });
          }
          res.status(200).json({ message: 'Ordonnance deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };

      exports.findOrdonnancesByAdherant = async (req, res) => {
        try {
          const adherantId = req.params.adherantId;
          const ordonnances = await Ordonnnance.find({ adherent: adherantId }).populate('medicaments');
          if (ordonnances.length === 0) {
            return res.status(404).json({ message: 'Ordonnances not found for the specified adherant' });
          }
      
          res.status(200).json(ordonnances);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };

      exports.findOrdonnancesByUserAndAdherant = async (req, res) => {
        try {
          const userId = req.body.userId;
          const adherantId = req.params.adherantId;
      
          const ordonnances = await Ordonnnance.find({ user: userId, adherent: adherantId }).populate('medicaments');;
      
          if (ordonnances.length === 0) {
            return res.status(404).json({ message: 'Ordonnances not found for the specified user and adherant' });
          }
      
          res.status(200).json(ordonnances);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };


      exports.findOrdonnancesByEtatFalse = async (req, res) => {
        try {
          const ordonnancesEtatFalse = await Ordonnnance.find({ etat: false }).populate('medicaments');;
          res.status(200).json(ordonnancesEtatFalse);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
      
      exports.findOrdonnancesByEtatTrue = async (req, res) => {
        try {
          const ordonnancesEtatTrue = await Ordonnnance.find({ etat: true }).populate('medicaments');;
          res.status(200).json(ordonnancesEtatTrue);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
 

