module.exports = (app) => {
    const posteController = require("./poste.controllers");
    var router = require("express").Router();
  
   
   // Route pour ajouter un nouveau poste
router.post("/addposte",  posteController.addPoste);

// Route pour obtenir tous les postes
router.get("/getallpostes", posteController.getAllPostes);

// Route pour obtenir un poste par ID
router.get("/:id", posteController.getPosteById);

// Route pour obtenir un poste par ID (sans similar)
router.get("/po/:id", posteController.getPosteByIdWithoutSimilar);

// Route pour obtenir les postes par catégorie
router.get('/category/:categories', posteController.getPostesByCategory);

// Route pour mettre à jour un poste par ID
router.put("/updateposte/:id", posteController.updatePosteById);

// Route pour supprimer un poste par ID
router.delete("/deletepo/:id", posteController.deletePosteById);


// Route pour obtenir les derniers postes
router.get('/dernier/job', posteController.getLatestPostes);
 
router.get('/count/poste', posteController.countTotalPostes);

router.delete("/:public_id", posteController.deleteImage);
  
    app.use("/postes", router);
  };
  