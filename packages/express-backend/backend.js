// backend.js
import express from "express";
import cors from "cors";

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

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.get('/users', (req, res) => {
   const name = req.query.name;
   if (name != undefined){
       let result = findUserByName(name);
       result = {users_list: result};
       res.send(result);
   }
   else{
       res.send(users);
   }
});

app.get('/users/:id', (req, res) => {
   const id = req.params['id']; //or req.params.id
   let result = findUserById(id);
   if (result === undefined) {
      res.status(404).send('Resource not found.');
   } else {
      res.send(result);
   }
   });

app.post("/users", (req, res) => {
      const userToAdd = req.body;
      userToAdd.id = generateRandomId()
      const result = addUser(userToAdd);
      res.status(201).send(result);
    });

app.delete("/users/:id", (req, res) => {
      const id = req.params["id"];
      let deleted = deleteUser(id);
      if (deleted === undefined) {
        res.status(404).send("resource not found");
      } else {
         res.status(204).end();
      }
   });

app.get("/users", (req, res) => {
      const name = req.query.name;
      const job = req.query.job;
      if (name != undefined && job != undefined) {
         let result = findUserByJobAndName(job, name);
         res.send(result);
      } else {
         res.status(404).send("Resource not found.");
      }
   });

const generateRandomId = () => {
      return Math.random().toString(36).substring(2, 8)
   };
   
const findUserByName = (name) => { 
   return users['users_list']
      .filter( (user) => user['name'] === name); 
   };

const addUser = (user) => {
   users['users_list'].push(user);
   return user;
};

const findUserById = (id) =>
 users['users_list']
     .find( (user) => user['id'] === id);
 

function deleteUser(id) {
   return users["users_list"] = users["users_list"].filter((user) => {user["id"] !== id;});
}

const findUserByJobAndName = (job, name) => {
   return users["users_list"].filter(
      (user) => user["job"] === job && user["name"] === name
   );
};