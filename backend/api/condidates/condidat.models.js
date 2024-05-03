const mongoose = require("mongoose");

const { Schema } = mongoose;

const condidatSchema = new mongoose.Schema({
  userID: {
    type: Schema.Types.ObjectId, // Change type to ObjectId to reference UserSchema's _id
    ref: "users", // Reference the UserSchema
    required: true,
  },

  email: {
    type: String,
   
   
  },

  lettre_de_motivation: { type: String },
  file: { type: String },

  accepted: { type: Boolean, default: false },
  titrePoste: {
    type: String,
    required: [true, "Titre du poste is required"],
  },
});
const CondidatSchema = mongoose.model("condidats", condidatSchema);

module.exports = CondidatSchema;
