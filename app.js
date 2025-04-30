const { useState, useContext, createContext } = React;

const AppContext = createContext();

function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [theme, setTheme] = useState('light');

  const addUser = (name) => {
    if (!name.trim()) return;
    setUsers([...users, { name: name.trim(), tasks: [] }]);
  };

  const selectUser = (index) => setSelectedUserIndex(index);

  const deselectUser = () => setSelectedUserIndex(null);

  const addTask = (text) => {
    if (selectedUserIndex === null || !text.trim()) return;
    const updated = [...users];
    updated[selectedUserIndex].tasks.push({ text: text.trim(), completed: false });
    setUsers(updated);
  };

  const toggleTask = (taskIndex) => {
    const updated = [...users];
    const task = updated[selectedUserIndex].tasks[taskIndex];
    task.completed = !task.completed;
    setUsers(updated);
  };

  const deleteTask = (taskIndex) => {
    const updated = [...users];
    updated[selectedUserIndex].tasks.splice(taskIndex, 1);
    setUsers(updated);
  };

  const editTask = (taskIndex) => {
    const updated = [...users];
    const newText = prompt("Editar tarea:", updated[selectedUserIndex].tasks[taskIndex].text);
    if (newText !== null && newText.trim() !== '') {
      updated[selectedUserIndex].tasks[taskIndex].text = newText.trim();
      setUsers(updated);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
  };

  return (
    <AppContext.Provider value={{
      users, selectedUserIndex, theme,
      addUser, selectUser, deselectUser,
      addTask, toggleTask, deleteTask, editTask, toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
}

function Sidebar() {
  const { users, selectedUserIndex, addUser, selectUser, deselectUser, toggleTheme } = useContext(AppContext);
  const [input, setInput] = useState('');

  const handleAddUser = () => {
    addUser(input);
    setInput('');
  };

  const selectedUser = users[selectedUserIndex];
  const completed = selectedUser?.tasks.filter(t => t.completed).length || 0;

  return (
    <aside className="sidebar card">
      <h2>Usuarios</h2>
      <ul id="userList">
        {users.map((user, i) => (
          <li key={i}
              onClick={() => selectUser(i)}
              style={{ cursor: 'pointer', fontWeight: selectedUserIndex === i ? 'bold' : 'normal' }}>
            {user.name}
          </li>
        ))}
      </ul>
      <input type="text" id="newUserInput" value={input} onChange={e => setInput(e.target.value)} placeholder="Nuevo usuario..." />
      <button onClick={handleAddUser}>Añadir Usuario</button>

      {selectedUserIndex !== null && (
        <div id="userInfo">
          <hr />
          <p id="userName">{selectedUser.name}</p>
          <p id="userStats">Tareas: {completed} / {selectedUser.tasks.length} completadas</p>
          <button onClick={deselectUser}>Deseleccionar</button>
        </div>
      )}

      <button id="themeToggleBtn" onClick={toggleTheme} style={{ marginTop: 'auto' }}>🌙/☀️ Tema</button>
    </aside>
  );
}

function TaskSection() {
  const { users, selectedUserIndex, addTask, toggleTask, deleteTask, editTask } = useContext(AppContext);
  const [taskInput, setTaskInput] = useState('');

  if (selectedUserIndex === null) {
    return <h1 id="mainTitle">Selecciona un usuario</h1>;
  }

  const user = users[selectedUserIndex];

  const handleAddTask = () => {
    addTask(taskInput);
    setTaskInput('');
  };

  return (
    <>
      <h1 id="mainTitle">Tareas de {user.name}</h1>
      <div id="taskSection">
        <ul id="taskList">
          {user.tasks.map((task, i) => (
            <li key={i} className={task.completed ? 'completed' : ''}>
              <span onClick={() => toggleTask(i)}>{task.text}</span>
              <div className="actions">
                <button onClick={() => editTask(i)}>✏️</button>
                <button onClick={() => deleteTask(i)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
        <input type="text" id="newTaskInput" value={taskInput} onChange={e => setTaskInput(e.target.value)} placeholder="Nueva tarea..." />
        <button onClick={handleAddTask}>Añadir Tarea</button>
      </div>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Sidebar />
        <main className="main">
          <div className="card">
            <TaskSection />
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
