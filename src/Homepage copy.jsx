import React, { useState, useEffect } from 'react';
import axios from './axios.js';
import TaskList from './TaskList.jsx';


function Homepage() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('tasks/');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    const newTask = { title: 'NOWE ZADANIE', description: 'MASZ BOJOWE ZADANIE!', complete: false };
    try {
      const response = await axios.post('tasks/', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <>
      <TaskList tasks={tasks} setTasks={setTasks} mainList={true} title='Dzienna lista zadań'/>
      <button className='add-task-button' onClick={addTask}>➕</button>
    </>
  );
}

export default Homepage;