const express = require('express');

const app = express();

app.use(express.json());

var users = [];

app.get('/users', (req, res) => {
  if (users.length > 0) {
    res.status(200).json(users)


  } 
  else {
    
    
    res.status(404).json({ message: "Not found" })
  }
});

app.post('/users', (req, res) => 
{
  const body = req.body;

  const userExistsIndex = users.findIndex((user) => user.name === req.body.name);

    if (userExistsIndex === -1) {

    users.push({
      id: Math.floor(Math.random() * 1000),
      name: body.name,
      age: body.age,
    })


    return res.status(200).json(users)
    } else {
    return res.status(400).json({ message: "User already exists" })
    }
});


app.put('/users/:id', (req, res) => 
{
  const body = req.body;

  const userExistsIndex = users.findIndex((user) => user.id === req.params.id);

    if (userExistsIndex !== -1) {
      return res.status(400).json({ message: "User does not exist" })

    } else {
         users[userExistsIndex].name = body.name;
         users[userExistsIndex].age = body.age;
      
      
          return res.status(200).json(users)
    }
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  const userExistsIndex = users.findIndex((user) => user.id === req.params.id);

  if(userExistsIndex !== -1){
    return res.status(400).json({message: "User does not exist"})
  }else {
    const usersRemoved = users.filter((user) => user.id !== id)
    users = usersRemoved;

    return res.status(201).json({message: "Users deleted"});
  }
});

app.listen(3334, () => console.log("On..."))