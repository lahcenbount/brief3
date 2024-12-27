const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');

// Créer une instance d'Express
const app = express();

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Connexion à la base de données MongoDB (utilisez MongoDB Atlas ou local)
mongoose.connect('mongodb://127.0.0.1:27017').then(() => console.log('Connexion à MongoDB réussie'))

.catch(err => console.log('Erreur de connexion MongoDB:', err));

// Utilisation des routes pour les tâches
app.use('/api', taskRoutes);

// Démarrer le serveur
const port =  3000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
