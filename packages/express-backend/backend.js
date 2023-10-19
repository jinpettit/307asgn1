// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      

 app.get('/users', (req, res) => {
   const { name, job } = req.query;
   userServices.getUsers(name, job)
       .then((result) => {
           res.send(result);
       })
       .catch((error) => {
           res.status(404).send("Resource not found.");
       });
});

app.get('/users/:id', (req, res) => {
   const id = req.params.id;
   userServices.findUserById(id)
       .then((result) => {
           if (result === null) {
               res.status(404).send('Resource not found.');
           } else {
               res.send(result);
           }
       })
       .catch((error) => {
           res.status(500).send('Server Error');
       });
});

app.post("/users", (req, res) => {
   const userToAdd = req.body;
   userServices.addUser(userToAdd)
       .then((result) => {
           res.status(201).send(result);
       })
       .catch((error) => {
           res.status(400).send('Bad Request');
       });
});

app.delete("/users/:id", (req, res) => {
   const id = req.params.id;
   userServices.deleteUser(id)
       .then((result) => {
           if (result.n === 0) {
               res.status(404).send("Resource not found.");
           } else {
               res.status(204).end();
           }
       })
       .catch((error) => {
           res.status(500).send('Internal Server Error');
       });
});