const mongoose = require('mongoose');

// Définir le schéma des tâches
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

// Créer le modèle basé sur le schéma
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
