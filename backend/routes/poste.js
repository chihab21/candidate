const express = require("express");
const router = express.Router();
const Poste = require("../models/poste");


// Route pour ajouter un nouveau produit
router.post("/addposte", async (req, res) => {
  try {
    // Récupérez les données du corps de la requête
    const { titre, description, competences, categories ,image } = req.body;

    // Créez une nouvelle instance de Product avec les données
    const newPoste = new Poste({
      titre,
      description,
      competences,
      categories,
      image, // Assurez-vous que "images" est un tableau d'URLs
    });

    // Enregistrez le nouveau produit dans la base de données
    const savedPoste = await newPoste.save();

    // Répondez avec le produit sauvegardé
    res.status(201).json(savedPoste);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  router.get("/getallpostes", (req, res) => {
    Poste.find()
      .then((postes) => {
        res.send(postes);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  router.get("/:id", async(req, res) => {
    const { id } = req.params;
    try {
       const poste = await Poste.findById(id);
       const similar = await Poste.find({ categories: poste.categories }).limit(5);
       res.status(200).json({ poste, similar }); // Placer les données dans un objet JSON
    } catch (e) {
       res.status(400).send(e.message);
    }
 });
 router.get("/po/:id", async(req, res) => {
  const { id } = req.params;
  try {
     const poste = await Poste.findById(id);
   
     res.status(200).json(poste ); // Placer les données dans un objet JSON
  } catch (e) {
     res.status(400).send(e.message);
  }
});
 
 router.get('/category/:categories' , async(req,res)=>{
  let { categories } = req.params;
  // Convertir la description en minuscules pour assurer une correspondance exacte
  categories = categories.toLowerCase();
  try {
    let poste;
    if(categories === "all") {
      poste = await Poste.find().sort([['date' , -1]]);
    } else {
      poste = await Poste.find({ categories });
    }
    res.status(200).json(poste);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

  
  router.put("/updateposte/:id", (req, res) => {
    id = req.params.id;
    newData = req.body;
    Poste.findByIdAndUpdate({ _id: id }, newData)
      .then((updated) => {
        res.send(updated);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  router.delete("/deletepo/:id", (req, res) => {
    id = req.params.id;
    Poste.findOneAndDelete({ _id: id })
      .then((deleted) => {
        res.send(deleted);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  
  
 module.exports=router;