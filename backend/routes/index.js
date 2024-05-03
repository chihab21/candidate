var express = require("express");
var router = express.Router();

require("../api/auth/auth.routes")(router);
require("../api/users/user.routes")(router);
require("../api/postes/poste.routes")(router);
require("../api/condidates/condidat.routes")(router);
require("../api/sendmail/sendmail.routes")(router);
module.exports = router;
