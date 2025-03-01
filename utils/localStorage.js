export const loadTasks = () => {
  try {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};


export const addTask = (newTask) => {
    const tasks = loadTasks();
    tasks.push(newTask);
    saveTasks(tasks);
}

export const deleteTask = (taskId) => {
    const tasks = loadTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);
}


export const updateTask = (updatedTask) => {
    const tasks = loadTasks();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
        tasks[index] = updatedTask;
        saveTasks(tasks);
    }
}