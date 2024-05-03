const mongoose = require("mongoose");
const { Schema } = mongoose;

const posteSchema = new mongoose.Schema({
    titre: {
        type: String
    },
    description: {
        type: String
    },
    competences: {
        type: String
    },
    categories: {
        type: String
    },
    image:
        {
            type: Array,
            required:true
        }
   
  
});

const Poste = mongoose.model("Poste", posteSchema);

module.exports = Poste;
