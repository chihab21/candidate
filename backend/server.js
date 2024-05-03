var app = require("./app.js");
const { checkToken } = require("./middleware/tokenValidation.js");
require("dotenv").config();

const PORT = process.env.APP_PORT;
  
app.get('/',checkToken,(req,res)=>{
  res.send('heelo')
})


app.listen(8000, async () => {
  console.log(`Listen to port ${8000}`);
});
