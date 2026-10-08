
import './App.css'
import { NavBar } from './assets/Components/NavBar'
import { TodoForm } from './assets/Components/TodoForm'
import { LoginForm } from './assets/Components/loginForm'
import { Sidebar } from './assets/Components/Sidebar'
import { useState } from 'react'
import Dashboard from './assets/Components/DashBoard'

function App() {
  const isLogin=false;

  const [showTodoForm, setTodoForm] = useState(false)
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('todo-app-tasks') || '[]')
    } catch {
      return []
    }
  })

  const saveTask = (taskData) => {
    const nextTasks = [
      ...tasks,
      { ...taskData, id: crypto.randomUUID(), status: 'Pending', createdAt: new Date().toISOString() },
    ]
    setTasks(nextTasks)
    localStorage.setItem('todo-app-tasks', JSON.stringify(nextTasks))
    setTodoForm(false)
  }

  const addTaskAction = (taskId, text) => {
    const nextTasks = tasks.map((task) => task.id === taskId
      ? {
          ...task,
          actions: [
            ...(task.actions || []),
            { id: crypto.randomUUID(), text, createdAt: new Date().toISOString() },
          ],
        }
      : task)

    setTasks(nextTasks)
    localStorage.setItem('todo-app-tasks', JSON.stringify(nextTasks))
  }

  const completeTask = (taskId) => {
    const nextTasks = tasks.map((task) => task.id === taskId
      ? { ...task, status: 'Completed' }
      : task)

    setTasks(nextTasks)
    localStorage.setItem('todo-app-tasks', JSON.stringify(nextTasks))
  }

  const deleteTask = (taskId) => {
    const nextTasks = tasks.filter((task) => task.id !== taskId)

    setTasks(nextTasks)
    localStorage.setItem('todo-app-tasks', JSON.stringify(nextTasks))
  }

  return (
    <>
      <NavBar onAddTask={() => setTodoForm(true)} />
      
      <div className="app-layout">
        {!isLogin && <Sidebar />}
        <section className="app-main">
          {isLogin ? (
            <LoginForm />
          ) : showTodoForm ? (
            <TodoForm onCancel={() => setTodoForm(false)} onSave={saveTask} />
          ) : (
            <Dashboard
              tasks={tasks}
              onAddTask={() => setTodoForm(true)}
              onAddAction={addTaskAction}
              onCompleteTask={completeTask}
              onDeleteTask={deleteTask}
            />
          )}
        </section>
      </div>
    </>
  )
}

export default App
