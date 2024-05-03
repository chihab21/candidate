const { verify } = require("jsonwebtoken");
const UserSchema = require("../api/users/user.models");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      verify(token, process.env.Secret_Key, async (err, decoded) => {
        if (err) {
          console.error(err);
          return res.status(401).send("Invalid token");
        } else {
          try {
            // Find the user by their ID
            const user = await UserSchema.findById(decoded._id); 
            if (!user) {
              return res.status(404).send("User not found");
            }
            req.user = user;
            next();
          } catch (error) {
            console.error("Error finding user:", error);
            return res.status(500).send("Server error");
          }
        }
      });
    } else {
      return res.status(401).send("Access denied! User not authorized");
    }
  },
};
