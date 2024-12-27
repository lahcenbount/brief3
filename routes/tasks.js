const express = require('express');
const Task = require('../modeles/tasks');

const router = express.Router();

// 1. Ajouter une tâche (POST /api/tasks)
router.post('/tasks', async (req, res) => {
  const { title, description } = req.body;

  // Validation de la présence des champs title et description
  if (!title || !description || title.trim() === '' || description.trim() === '') {
    return res.status(400).json({ message: 'Le titre et la description sont requis et ne doivent pas être vides.' });
  }

  try {
    // Création et sauvegarde de la tâche
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la tâche.' });
  }
});

// 2. Afficher toutes les tâches (GET /api/tasks)
router.get('/tasks', async (req, res) => {
  try {
    // Récupérer toutes les tâches
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches.' });
  }
});

// 3. Mettre à jour une tâche (PUT /api/tasks/:id)
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  // Validation du statut complet
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Le statut doit être un booléen.' });
  }

  try {
    // Vérifier si la tâche existe
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    // Mise à jour de la tâche
    task.title = title;
    task.description = description;
    task.completed = completed;
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche.' });
  }
});

// 4. Supprimer une tâche (DELETE /api/tasks/:id)
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Suppression de la tâche
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    res.json({ message: 'Tâche supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche.' });
  }
});

module.exports = router;





