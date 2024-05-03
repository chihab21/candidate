require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "brahmiwiem359@gmail.com", // votre adresse email
    pass: "mthi idte yqdt tpcn", // votre mot de passe
  },
});

// Fonction d'envoi d'email
const sendEmail = async (req, res) => {
  const { email, subject, message } = req.body;
  console.log(email, subject, message);

  var mailOptions = {
    from: "brahmiwiem359@gmail.com",
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("Erreur lors de l'envoi de l'email");
    } else {
      console.log("Email envoyé avec succès !");
      res.status(200).send("Email envoyé avec succès !");
    }
  });
};

module.exports = { sendEmail };
