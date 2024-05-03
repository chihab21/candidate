const { checkToken } = require("../../middleware/tokenValidation");

module.exports = (app) => {
    const condidatController = require("./condidat.controllers");
    const multer = require("multer");
    const crypto = require("crypto");
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./uploads/");
        },
        filename: function (req, file, cb) {
          crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);
            const uniqueSuffix = buf.toString("hex");
            cb(null, uniqueSuffix + "-" + file.originalname);
          });
        },
      });
      
      const upload = multer({ storage: storage }).single("file");
   

    var router = require("express").Router();
router.post('/create', checkToken,upload, condidatController.createCondidat);
 router.get("/", condidatController.getAllCondidats);

 router.get("/:id", condidatController.getCondidatById);
  router.delete("/:id", condidatController.deleteCondidatById);
 router.get('/con/acceptedcondidats', condidatController.getAcceptedCondidats);
 router.put('/:id/accept', condidatController.acceptCondidat);
 router.get('/poste/:titre', condidatController.getCondidatsByPosteTitle);
 router.get('/count/condidat', condidatController.countTotalCondidates);
 // Route pour obtenir tous les condidats acceptés par titre de poste
router.get('/accepted/:titre', condidatController.getAcceptedCondidatsByPosteTitle);
    
router.get('/nonaccepted/:titre',  condidatController.getNonAcceptedCondidatsByPosteTitle); 
    app.use("/condidates", router);
 };