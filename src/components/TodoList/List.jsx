import React, { useState } from 'react';
import './list.css';
import Form from '../Form/Form.jsx';

function List() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Rédiger le rapport", description: "Finir le rapport mensuel.", status: "todo" },
    { id: 2, title: "Corriger le bug de connexion", description: "Le bouton de login ne fonctionne pas sur Safari.", status: "in-progress" },
    { id: 3, title: "Maquette du site web", description: "Valider les wireframes.", status: "done" },
    { id: 4, title: "Préparer la réunion", description: "Créer les slides pour vendredi.", status: "todo" }
  ]);


  // Fonction qui reçoit la nouvelle tâche créée par le formulaire
  const handleAddTask = (nouvelleTache) => {
    setTasks((prevTasks) => [...prevTasks, nouvelleTache]);
  };

  //Modification status 
  const ModifierTache = (taskId) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, status: "in-progress" } : task
    )
   );
  };

  //Mettre en terminer
   const TerminerTache = (taskId) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, status: "done" } : task
    )
   );
  };
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  const TaskCard = ({ task ,onStart, onComplete}) => (
    <div className="kanban-task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.status === 'todo' && (
      <button 
        className="btn-start" 
        onClick={() => onStart(task.id)}
      >
        Mettre en cours
      </button>
    )}
    {task.status === 'in-progress' && (
      <button 
        className="btn-term" 
        onClick={() => onComplete(task.id)}
      >
        Terminer
      </button>
    )}

    </div>
  );

  return (
    <div className="kanban-wrapper">
      <header className="kanban-header">
        <h1>Tableau Kanban</h1>
      </header>

      {/* Liaison avec les nouveaux noms de variables */}
      <Form ajoutTache={handleAddTask} />

      <div className="kanban-container">
        <div className="kanban-column todo-col">
          <h2 className="column-title">
            À faire <span className="task-count">{todoTasks.length}</span>
          </h2>
          <div className="task-list">
            {todoTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStart={ModifierTache} 
                onComplete={TerminerTache}
              />
            ))}
          </div>
        </div>

        <div className="kanban-column in-progress-col">
          <h2 className="column-title">
            En cours <span className="task-count">{inProgressTasks.length}</span>
          </h2>
          <div className="task-list">
            {inProgressTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task}
                onStart={ModifierTache} 
                onComplete={TerminerTache} 
              />
            ))}
          </div>
        </div>

        <div className="kanban-column done-col">
          <h2 className="column-title">
            Terminé <span className="task-count">{doneTasks.length}</span>
          </h2>
          <div className="task-list">
            {doneTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default List