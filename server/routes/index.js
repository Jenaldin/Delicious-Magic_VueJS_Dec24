import express from "express";
import auth from "./authRoute.js";
import recipe from "./recipeRoute.js";
import comment from "./commentRoute.js";
const apiRouter = express.Router();

apiRouter.use("/user", auth);
apiRouter.use("/catalog", recipe);
apiRouter.use("/comment", comment);
apiRouter.use("/", function (req, res) {
  res.send(`<div><h3>Speak Friend And Enter!</h3></div>
   <div><h3><i>- Gandalf the Gray, Lord of the Rings, J.R.R. Tolkien</i></h3></div>
   <br>
   <div><h3>You have reached the test location, confirming that the API routes are functional.</h3></div>
   <div><h3>Please use the front-end application for more. Thank you!</h3></div>`);
});

export default apiRouter;
