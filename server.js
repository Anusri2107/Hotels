const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Welcome to our Hotel')
})

// app.get('/paneer',(req,res)=>{
//     res.send('I would love to serve you paneer')
// })

// app.get('/chicken',(req,res)=>{
//     res.send('I would love to serve you chicken')
// })

// app.get('/idli',(req,res)=>{
//     const customized_idli = {
//         name: 'rava idli',
//         size: '10 cm diameter',
//         is_sambhar: true,
//         is_chutney: true
//     }
//     res.send(customized_idli);
// })

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);

app.listen(PORT,()=>{
    console.log('Listening on port 3000');
})