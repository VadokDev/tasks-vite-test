
import { useState } from "react"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Item } from "@/components/ui/item"
import { Task } from "@/lib/types"
import { useTask } from "../tasks/TaskContext"

function TasksView() {
  const { tasks, addTask, toggleTask, deleteTask } = useTask()
  const [newTask, setNewTask] = useState("")

  const addTaskHandler = () => {
    if (newTask.trim() === "") return

    const task: Task = {
      name: newTask,
      status: 'Pending',
    }

    addTask(task)
    setNewTask("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTaskHandler()
    }
  }

  const pendingTasks = tasks.filter((task) => task.status === 'Pending')
  const completedTasks = tasks.filter((task) => task.status === 'Done')

  return <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        <div className="space-y-2 name-center">
          <h1 className="text-3xl font-bold tracking-tight">Task List</h1>
          <p className="text-muted-foreground">Keep track of your tasks and stay organized</p>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={addTaskHandler} size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add task</span>
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({pendingTasks.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Item tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            <Item tasks={pendingTasks} onToggle={toggleTask} onDelete={deleteTask} />
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <Item tasks={completedTasks} onToggle={toggleTask} onDelete={deleteTask} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </main>
}

export default TasksView
