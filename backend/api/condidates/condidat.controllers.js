const CondidatSchema = require("../condidates/condidat.models");
const PosteSchema = require("../postes/poste.models");
const UserSchema = require("../users/user.models");
require("dotenv").config();

// Créer un nouveau condidat
exports.createCondidat = async (req, res, next) => {
  const { titrePoste, lettre_de_motivation } = req.body;
  const { file } = req;

  try {
    const user = await UserSchema.findById(req.user._id); 
    if (!user) {
      return res.status(404).send("User not found");
    }

    const existingCondidat = await CondidatSchema.findOne({ userID: user._id, titrePoste });

    if (existingCondidat) {
      return res.status(400).json({ success: false, error: "You have already applied for this position" });
    }
    const newCondidat = new CondidatSchema({
      userID: user._id,
      titrePoste,
      email: user.email,
      lettre_de_motivation,
      file: (file && file.filename) || null, 
    });

    const saved = await newCondidat.save();

    return res.status(201).json({ success: true, information: saved });
  } catch (error) {
    console.error("Error adding candidate:", error);
    return res.status(500).json({ success: false, error: "Error adding candidate" });
  }
};
// Obtenir tous les condidats
exports.getAllCondidats = async (req, res, next) => {
  try {
    const condidats = await CondidatSchema.find().populate(
      "userID",
      "name lastname email"
    );
    return res.send({
      success: true,
      condidats: condidats,
    });
  } catch (e) {
    next(e);
  }
};

// Obtenir un condidat par son ID
exports.getCondidatById = async (req, res, next) => {
  const condidatId = req.params.id;
  try {
    const condidat = await CondidatSchema.findById(condidatId);
    if (!condidat) {
      return res.status(404).send({
        success: false,
        message: "Condidat not found",
      });
    }
    return res.send({
      success: true,
      condidat: condidat,
    });
  } catch (e) {
    next(e);
  }
};

// Supprimer un condidat par son ID
exports.deleteCondidatById = async (req, res, next) => {
  const condidatId = req.params.id;
  try {
    const deletedCondidat = await CondidatSchema.findByIdAndDelete(condidatId);
    if (!deletedCondidat) {
      return res.status(404).send({
        success: false,
        message: "condidat not delete",
      });
    }
    return res.send({
      success: true,
      message: "condidat deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

// Obtenir tous les condidats acceptés
exports.getAcceptedCondidats = async (req, res, next) => {
  try {
    // Récupérer tous les condidats acceptés depuis la base de données
    const acceptedCondidats = await CondidatSchema.find({ accepted: true });
    res.json(acceptedCondidats);
  } catch (error) {
    console.error("Error fetching accepted condidats:", error);
    res.status(500).json({ error: "Failed to fetch accepted condidats" });
  }
};

// Accepter un condidat par son ID
exports.acceptCondidat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCondidat = await CondidatSchema.findByIdAndUpdate(
      id,
      { accepted: true },
      { new: true }
    );
    res.json(updatedCondidat);
  } catch (error) {
    console.error("Error accepting condidat:", error);
    res.status(500).json({ error: "Failed to accept condidat" });
  }
};
exports.getCondidatsByPosteTitle = async (req, res, next) => {
  const { titre } = req.params;
  try {
    // Recherche des candidats avec le titre de poste spécifique
    const condidats = await CondidatSchema.find({ titrePoste: titre }).select(
      "name email lettre_de_motivation file titrePoste"
    );

    // Si aucun candidat n'est trouvé pour ce titre de poste
    if (condidats.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucun candidat trouvé pour le titre de poste spécifié",
      });
    }

    // Si des candidats sont trouvés, renvoyer les informations spécifiques des candidats
    return res.status(200).json({
      success: true,
      condidats: condidats,
    });
  } catch (error) {
    console.error("Error fetching condidats by poste title:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch condidats by poste title" });
  }
};
exports.countTotalCondidates = async (req, res) => {
  try {
    const totalCondidates = await CondidatSchema.countDocuments();
    res.status(200).json({ count: totalCondidates });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Obtenir tous les candidats acceptés par titre de poste
exports.getAcceptedCondidatsByPosteTitle = async (req, res, next) => {
  const { titre } = req.params;
  try {
    // Recherche des candidats acceptés avec le titre de poste spécifique
    const acceptedCondidats = await CondidatSchema.find({
      titrePoste: titre,
      accepted: true,
    }).select("name email lettre_de_motivation file titrePoste");

    // Si aucun candidat accepté n'est trouvé pour ce titre de poste
    if (acceptedCondidats.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Aucun candidat accepté trouvé pour le titre de poste spécifié",
      });
    }

    // Si des candidats acceptés sont trouvés, renvoyer les informations spécifiques des candidats
    return res.status(200).json({
      success: true,
      condidats: acceptedCondidats,
    });
  } catch (error) {
    console.error("Error fetching accepted condidats by poste title:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch accepted condidats by poste title" });
  }
};
exports.getNonAcceptedCondidatsByPosteTitle = async (req, res, next) => {
  const { titre } = req.params;
  try {
    // Recherche des candidats non acceptés avec le titre de poste spécifique
    const nonAcceptedCondidats = await CondidatSchema.find({
      titrePoste: titre,
      accepted: false,
    }).populate("userID", "name email"); // Populate the userID field with user information

    // Si aucun candidat non accepté n'est trouvé pour ce titre de poste
    if (nonAcceptedCondidats.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Aucun candidat non accepté trouvé pour le titre de poste spécifié",
      });
    }

    // Envoyer les candidats non acceptés avec les informations utilisateur
    res.status(200).json({
      success: true,
      condidats: nonAcceptedCondidats,
    });
  } catch (error) {
    console.error("Error fetching non accepted condidats by poste:", error);
    res.status(500).json({
      success: false,
      message:
        "Une erreur s'est produite lors de la récupération des candidats non acceptés",
    });
  }
};
