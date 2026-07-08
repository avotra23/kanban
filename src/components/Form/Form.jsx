import React, { useState } from 'react';
import './Form.css';

function Form({ ajoutTache }) {
  const [ajouter, setAjouter] = useState({
    title: '',
    description: '',
    status: 'todo'
  });

  const ecouteSubmit = (e) => {
    e.preventDefault();
    
    // Validation simple sur le titre
    if (!ajouter.title.trim()) return;

    // Préparation de la nouvelle tâche avec un ID unique
    const nouvelleTache = {
      id: Date.now(),
      ...ajouter
    };

    // Envoi au composant parent List via la prop ajoutTache
    ajoutTache(nouvelleTache);

    // Réinitialisation de l'état
    setAjouter({
      title: '',
      description: '',
      status: 'todo'
    });
  };

  // Petite fonction pour simplifier la mise à jour des champs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setAjouter(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  return (
    <form className="kanban-form" onSubmit={ecouteSubmit}>
      <h3>Ajouter une tâche</h3>
      
      <div className="form-group">
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          placeholder="Ex: Corriger le bug..."
          value={ajouter.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Détails de la tâche..."
          value={ajouter.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Colonne / Groupe</label>
        <select
          id="status"
          value={ajouter.status}
          onChange={handleChange}
        >
          <option value="todo">À faire</option>
          <option value="in-progress">En cours</option>
          <option value="done">Terminé</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">Ajouter la tâche</button>
    </form>
  );
}
export default Form