import { useMemo, useState } from 'react'
import './Style/dashboard.css'

const categoryColors = ['violet', 'blue', 'green', 'orange']

export default function Dashboard({ tasks = [], onAddTask, onAddAction, onCompleteTask, onDeleteTask }) {
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [actionText, setActionText] = useState('')
  const [month, setMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const selectedTask = tasks.find((task) => task.id === selectedTaskId)
  const today = new Date()
  const savedTasks = [...tasks].sort((first, second) => {
    const firstDate = `${first.dueDate || '9999-12-31'}T${first.dueTime || '23:59'}`
    const secondDate = `${second.dueDate || '9999-12-31'}T${second.dueTime || '23:59'}`
    return firstDate.localeCompare(secondDate)
  })
  const doneCount = tasks.filter((task) => task.status === 'Completed').length
  const pendingCount = tasks.length - doneCount
  const importantCount = tasks.filter((task) => task.important).length
  const categories = useMemo(() => {
    const counts = tasks.reduce((result, task) => {
      const name = task.category || 'Uncategorized'
      result[name] = (result[name] || 0) + 1
      return result
    }, {})
    return Object.entries(counts).map(([name, count], index) => ({
      name,
      count,
      color: categoryColors[index % categoryColors.length],
    }))
  }, [tasks])

  const firstWeekday = month.getDay()
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const taskDates = new Set(tasks.map((task) => task.dueDate))
  const selectedLabel = selectedDate.toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })

  const saveAction = (event) => {
    event.preventDefault()
    const text = actionText.trim()
    if (!text || !selectedTask) return

    onAddAction?.(selectedTask.id, text)
    setActionText('')
  }

  const deleteSelectedTask = () => {
    if (!selectedTask || !window.confirm(`Delete "${selectedTask.title}"? This cannot be undone.`)) return

    onDeleteTask?.(selectedTask.id)
    setSelectedTaskId(null)
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">YOUR SPACE</p>
          <h1>Today&apos;s Tasks</h1>
          <p className="dashboard-intro">Keep track of your tasks and stay productive.</p>
        </div>
        <button className="dashboard-add-button" onClick={onAddTask} type="button">+ Add Task</button>
      </header>

      <section className="dashboard-stats" aria-label="Task summary">
        <article className="stat-card"><span className="stat-icon stat-purple">☷</span><div><p>Total Tasks</p><strong>{tasks.length}</strong></div></article>
        <article className="stat-card"><span className="stat-icon stat-green">✓</span><div><p>Completed</p><strong>{doneCount}</strong></div></article>
        <article className="stat-card"><span className="stat-icon stat-blue">◷</span><div><p>Pending</p><strong>{pendingCount}</strong></div></article>
        <article className="stat-card"><span className="stat-icon stat-orange">☆</span><div><p>Important</p><strong>{importantCount}</strong></div></article>
      </section>

      <div className="dashboard-columns">
        <section className="dashboard-panel">
          <div className="panel-heading"><div><p className="panel-kicker">TASK LIST</p><h2>Saved Tasks</h2></div></div>
          <div className="task-list">
            {savedTasks.length === 0 ? <p className="empty-tasks">No saved tasks yet. Add a task to get started.</p> : savedTasks.map((task) => (
              <article
                className="dashboard-task"
                key={task.id}
                role="button"
                tabIndex={0}
                aria-label={`Open task ${task.title}`}
                onClick={() => setSelectedTaskId(task.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedTaskId(task.id)
                  }
                }}
              >
                <span className="task-check" aria-hidden="true" />
                <div className="dashboard-task-content">
                  <div className="task-title-line"><h3>{task.title}</h3>{task.important && <span className="important-badge">★ Important</span>}</div>
                  {task.description && <p>{task.description}</p>}
                  <div className="task-meta"><span>{task.dueDate || 'No due date'}</span><span>{task.dueTime || 'No time set'}</span><span className="category-tag">{task.category}</span><span className={`priority-tag priority-${(task.priority || 'medium').toLowerCase()}`}>{task.priority || 'Medium'}</span><span className="task-status">{task.status || 'Pending'}</span></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-panel" aria-label="Calendar">
          <div className="calendar-heading">
            <div><p className="panel-kicker">SCHEDULE</p><h2>{month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2></div>
            <div className="calendar-controls">
              <button type="button" aria-label="Previous month" onClick={() => setMonth((value) => new Date(value.getFullYear(), value.getMonth() - 1, 1))}>‹</button>
              <button type="button" aria-label="Next month" onClick={() => setMonth((value) => new Date(value.getFullYear(), value.getMonth() + 1, 1))}>›</button>
            </div>
          </div>
          <div className="calendar-grid calendar-weekdays" aria-hidden="true">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}</div>
          <div className="calendar-grid calendar-days">
            {Array.from({ length: firstWeekday }, (_, index) => <span className="calendar-blank" key={`blank-${index}`} />)}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const date = new Date(month.getFullYear(), month.getMonth(), index + 1)
              const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
              const selected = date.toDateString() === selectedDate.toDateString()
              const isToday = date.toDateString() === today.toDateString()
              return <button className={`calendar-day${selected ? ' selected' : ''}${isToday ? ' today' : ''}`} key={dateKey} type="button" aria-pressed={selected} onClick={() => setSelectedDate(date)}>{date.getDate()}{taskDates.has(dateKey) && <i />}</button>
            })}
          </div>
          <p className="selected-date">Selected date: <strong>{selectedLabel}</strong></p>
        </section>
      </div>

      <section className="categories-section">
        <div className="panel-heading category-heading"><div><p className="panel-kicker">STAY ORGANIZED</p><h2>Categories</h2></div></div>
        {categories.length === 0 ? <p className="empty-tasks">Categories you use will appear here.</p> : <div className="category-grid">
          {categories.map((category) => <article className="category-card" key={category.name}><span className={`category-icon ${category.color}`}>{category.name.slice(0, 1)}</span><span><span className="category-name">{category.name}</span><span className="category-count">{category.count} {category.count === 1 ? 'task' : 'tasks'}</span></span></article>)}
        </div>}
      </section>

      {selectedTask && (
        <div className="task-detail-backdrop" onClick={() => setSelectedTaskId(null)}>
          <section
            className="task-detail-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="task-detail-heading">
              <div>
                <p className="panel-kicker">TASK DETAILS</p>
                <h2 id="task-detail-title">{selectedTask.title}</h2>
              </div>
              <button
                className="task-detail-close"
                type="button"
                aria-label="Close task details"
                onClick={() => setSelectedTaskId(null)}
              >×</button>
            </div>

            {selectedTask.description && <p className="task-detail-description">{selectedTask.description}</p>}
            <div className="task-meta task-detail-meta">
              <span>{selectedTask.dueDate || 'No due date'}</span>
              <span>{selectedTask.dueTime || 'No time set'}</span>
              <span className="category-tag">{selectedTask.category || 'Uncategorized'}</span>
              <span className={`priority-tag priority-${(selectedTask.priority || 'medium').toLowerCase()}`}>{selectedTask.priority || 'Medium'}</span>
              <span className="task-status">{selectedTask.status || 'Pending'}</span>
            </div>

            <div className="task-detail-controls">
              <button
                className="task-complete-button"
                type="button"
                disabled={selectedTask.status === 'Completed'}
                onClick={() => onCompleteTask?.(selectedTask.id)}
              >
                {selectedTask.status === 'Completed' ? '✓ Completed' : 'Mark Complete'}
              </button>
              <button className="task-delete-button" type="button" onClick={deleteSelectedTask}>
                Delete Task
              </button>
            </div>

            <section className="task-actions-section" aria-label="Task actions">
              <h3>Project actions</h3>
              {(selectedTask.actions || []).length === 0 ? (
                <p className="empty-actions">No actions added yet.</p>
              ) : (
                <ul className="task-action-list">
                  {selectedTask.actions.map((action) => (
                    <li key={action.id}>
                      <span>{action.text}</span>
                      <time dateTime={action.createdAt}>{new Date(action.createdAt).toLocaleString()}</time>
                    </li>
                  ))}
                </ul>
              )}
              <form className="task-action-form" onSubmit={saveAction}>
                <label htmlFor="task-action">Add an action or update</label>
                <textarea
                  id="task-action"
                  value={actionText}
                  onChange={(event) => setActionText(event.target.value)}
                  placeholder="Describe what you did or plan to do..."
                  rows="3"
                  required
                />
                <button className="dashboard-add-button" type="submit" disabled={!actionText.trim()}>
                  + Add Action
                </button>
              </form>
            </section>
          </section>
        </div>
      )}
    </main>
  )
}
