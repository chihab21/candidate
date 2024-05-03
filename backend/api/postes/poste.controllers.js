const PosteSchema = require("../postes/poste.models");
require("dotenv").config();
const cloudinary = require('cloudinary');

// Configurez Cloudinary avec vos clés d'API
cloudinary.config({
    cloud_name: 'dqwc3ewbs',
    api_key: '845715758165965',
    api_secret: 'tXNo6r10KdziNI2_-49KmwmJnws',
});

// Ajouter un nouveau poste
exports.addPoste = async (req, res) => {
  try {
    const { titre, description, competences, categories ,image } = req.body;
    const newPoste = new PosteSchema({
      titre,
      description,
      competences,
      categories,
      image,
    });
    const savedPoste = await newPoste.save();
    res.status(201).json(savedPoste);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtenir tous les postes
exports.getAllPostes = async (req, res) => {
  try {
    const postes = await PosteSchema.find();
    res.status(200).json(postes);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtenir un poste par ID
exports.getPosteById = async (req, res) => {
  const { id } = req.params;
  try {
    const poste = await PosteSchema.findById(id);
    const similar = await PosteSchema.find({ categories: poste.categories }).limit(5);
    res.status(200).json({ poste, similar });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// Obtenir un poste par ID (sans similar)
exports.getPosteByIdWithoutSimilar = async (req, res) => {
  const { id } = req.params;
  try {
    const poste = await PosteSchema.findById(id);
    res.status(200).json(poste);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// Obtenir les postes par catégorie
exports.getPostesByCategory = async (req, res) => {
  let { categories } = req.params;
  categories = categories.toLowerCase();
  try {
    let poste;
    if(categories === "all") {
      poste = await PosteSchema.find().sort([['date' , -1]]);
    } else {
      poste = await PosteSchema.find({ categories });
    }
    res.status(200).json(poste);
  } catch(e) {
    res.status(400).send(e.message);
  }
};

// Mettre à jour un poste par ID
exports.updatePosteById = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedPoste = await PosteSchema.findByIdAndUpdate(id, newData, { new: true });
    res.status(200).json(updatedPoste);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Supprimer un poste par ID
exports.deletePosteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPoste = await PosteSchema.findByIdAndDelete(id);
    res.status(200).json(deletedPoste);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Obtenir les derniers postes
exports.getLatestPostes = async (req, res) => {
  try {
    const latestPostes = await PosteSchema.find().sort({datePublication: -1 }).limit(6);
    res.status(200).json(latestPostes);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Compter le nombre total de postes
exports.countTotalPostes = async (req, res) => {
  try {
    const totalPostes = await PosteSchema.countDocuments();
    res.status(200).json({ count: totalPostes });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.deleteImage = async (req, res) => {
  const { public_id } = req.params;
  console.log('Received DELETE request for public_id:', public_id);

  try {
      await cloudinary.uploader.destroy(public_id);
      console.log('Image deleted successfully');
      res.status(200).send();
  } catch (e) {
      console.error('Error deleting image:', e);
      res.status(500).send(e.message);
  }
};