const mongoose = require('mongoose');
const express = require("express");
const router=express.Router();

const Condidat = require("../models/condidat");
const ObjectId = mongoose.Types.ObjectId;
  
router.post("/create", async (req, res, next) => {
    const { name, email, lettre_de_motivation, titrePoste } = req.body; // Ajoutez le titre du poste à la requête
    const { file } = req;
    let owner = null;
    if (req.user) {
        owner = req.user;
    }
    const newCondidat = new Condidat({
        name,
        email,
        lettre_de_motivation,
        titrePoste, // Ajoutez le titre du poste à l'objet newCondidat
        owner,
        cv: (file && file.filename) || null,
    });
  
    try {
        const saved = await newCondidat.save();
        return res.send({
            success: true,
            information: saved,
        });
    } catch (e) {
        next(e);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const condidats = await Condidat.find();
        return res.send({
            success: true,
            condidats: condidats,
        });
    } catch (e) {
        next(e);
    }
});
router.get("/:id", async (req, res, next) => {
    const condidatId = req.params.id;
    try {
        const condidat = await Condidat.findById(condidatId);
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
});

router.delete("/:id", async (req, res, next) => {
    const condidatId = req.params.id;
    try {
        const deletedCondidat = await Condidat.findByIdAndDelete(condidatId);
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
});
router.get('/con/acceptedcondidats', async (req, res) => {
    try {
        // Récupérer tous les condidats acceptés depuis la base de données
        const acceptedCondidats = await Condidat.find({ accepted: true });
        res.json(acceptedCondidats);
    } catch (error) {
        console.error('Error fetching accepted condidats:', error);
        res.status(500).json({ error: 'Failed to fetch accepted condidats' });
    }
});


  
router.put('/:id/accept', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCondidat = await Condidat.findByIdAndUpdate(id, { accepted: true }, { new: true });
      res.json(updatedCondidat);
    } catch (error) {
      console.error('Error accepting condidat:', error);
      res.status(500).json({ error: 'Failed to accept condidat' });
    }
  });

  module.exports=router;
  