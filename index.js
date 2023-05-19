const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const mqtt = require('mqtt');

app.use(express.static(path.join(__dirname, 'public')));

//Base de datos
const mongoose = require('mongoose');
const { link } = require("fs");
const { get } = require("http");

main().catch(err => console.log(err))

async function main() {
  await mongoose.connect('mongodb+srv://admin:Almi123@cluster0.m970ldu.mongodb.net/?retryWrites=true&w=majority');
}

//temps
const tempSchema = new mongoose.Schema({
  temp: Number,
  hum: Number
});

const Temperatura = mongoose.model('Temperatura', tempSchema); //Temperatura

async function findTemps() {
  const temperaturas = await Temperatura.find();
  console.log(temperaturas);
}

findTemps().catch(err => console.log(err))


app.get("/temps", async (req, res) => {
  const temperaturas = await Temperatura.find();
  const temperaturatexto = JSON.stringify(temperaturas);
  res.status(200).send(`<html>
    <head>
      <title>Temperaturas</title>
      <link rel="stylesheet" href="public/temperatura.css">
    </head>
    <body>
      <h1>Temperaturas</h1>
      <pre>${JSON.stringify(temperaturas)}</pre>
    </body>
  </html>`
  );
  }); 

  //Aquí termina temps
 
  //Endpoints de la web
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.get("/registro", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/registro.html"));
  })

  app.get("/registrado", (req,res) => {
    res.status(200).send("Registrado");
  })
  
  //Enpoints POST web
  app.post("/auth", (req, res) => {
    let usuario = req.body.user;
    let pwd = req.body.pwd;

     // Crear una instancia del modelo
  async function insertarDocumento() {
    try {
      // Crear una instancia del modelo
      const user_nuev = new Usuario({ name: user, pass: pwd });
  
      // Guardar el documento en la base de datos
      const documentoGuardado = await user_nuev.save();
  
      console.log('Documento guardado:', documentoGuardado);
    } catch (error) {
      console.error(error);
    }
  }
  
  insertarDocumento();

    res.redirect('/registrado');
  })


/*Borrar comentarios*/
app.listen(port, () => { 
  console.log(`Example app listening on port ${port}!`);
});
