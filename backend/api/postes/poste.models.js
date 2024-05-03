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
    datePublication: {
        type: Date,
        default: Date.now // Cette ligne permettra d'attribuer automatiquement la date actuelle lors de la création du poste
    },
    image:
        {
            type: Array,
            required:true
        }
        
   
  
});

const PosteSchema = mongoose.model("postes", posteSchema);

module.exports = PosteSchema;
