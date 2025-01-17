import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<h3>You Shall Not Pass!!!</h3>
   <div><h3><i>- Gandalf the Gray, Lord of the Rings, J.R.R. Tolkien</i></h3></div>
   <br>
   <div><h3>Welcome to the API. This is the server.</h3></div>
   <div><h3>Please use the front-end application, thank you!</h3></div>`);
});

router.get("*", (req, res) => {
  res.status(404).send(`<div><h3>Not All Who Wonder Are Lost...</h3></div>
   <div><h3><i>- Bilbo, Lord of the Rings, J.R.R. Tolkien</i></h3></div>
   <br>
   <div><h3>The requested resource could not be found on this server.</h3></div>
   <div><h3>Please use the front-end application, thank you!</h3></div>`);
});

export default router;
