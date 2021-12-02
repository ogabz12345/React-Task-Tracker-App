import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react"
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  const [showAddTask, setShowAddtask] = useState(false);

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer);
    }

    getTasks()
  }, [])

  //Fetch (GETALL) tasks from API
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();

    return data;
  }

  //Add (POST) Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();
    setTasks([...tasks, data]);
    setShowAddtask(false);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask ={ id, ...task}
    // setTasks([...tasks, newTask]);
    // setShowAddtask(false);

  }

  // Delete (DELETE) task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })


    setTasks(tasks.filter(e => e.id !== id));
  }

  //Fetch (GetOne) task from API
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();

    return data;
  }

  //Go back to home page
  const goBack = () => {
    setShowAddtask(false);
  }

  //Toggle (PUT)reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json();

    setTasks(tasks.map((task) => task.id === id
      ? { ...task, reminder: data.reminder } : task))
  }

  //Toggle Add Task Button
  const headerTitle = 'Tracker App'
  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddtask(!showAddTask)} showAdd={showAddTask} title={headerTitle}></Header>

        <Routes>
          <Route path="/" exact element={ (
            <>
              {
                showAddTask && <AddTask onAdd={addTask} onCancel={goBack}></AddTask>
              }
              {!showAddTask && tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>
                : 'No Tasks To Show'
              }
            </>
          )}>

          </Route>
          <Route path="/about"  element={<About></About>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
