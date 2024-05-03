const express = require('express');
const router = express.Router();

module.exports = (app) => {
    const sendmailController = require("./sendmail.controllers");

    // Assurez-vous d'ajouter la route au routeur
    router.post("/mail", sendmailController.sendEmail);

    // Utilisez le routeur dans l'application express
    app.use("/sendmail", router);
};
