import { TaskProvider } from "./tasks/TaskProvider";
import { LoginView } from "./views/Login";
import TasksView from "./views/Tasks";

function App() {
  const loggedIn = localStorage.getItem('token');

  if (loggedIn) {
    return <TaskProvider><TasksView /></TaskProvider>;
  }

  return <LoginView />;
}

export default App
