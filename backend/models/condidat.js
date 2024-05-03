const mongoose = require('mongoose');

const { Schema } = mongoose;

const condidatSchema = Schema({
    name: {
        type: String,
        required:[true, 'is required']
    },


        email:{
            type:String,
            required:[true, 'is required'],
            unique:true,
            index:true,
            
        },
 
  lettre_de_motivation: { type: String },
  cv: { type: String },
  
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  accepted: { type: Boolean, default: false },
  titrePoste: { type: String, required: [true, 'Titre du poste is required'] },
}
);

const Condidat = mongoose.model('Condidat', condidatSchema);
module.exports = Condidat;