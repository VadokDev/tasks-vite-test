import { cn } from "@/lib/utils"
import { Task } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

type ItemProps = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const Item = ({ tasks, onToggle, onDelete }: ItemProps) => {
  if (tasks.length === 0) {
    return <div className="text-center py-6 text-muted-foreground">No tasks found</div>
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={cn("flex items-center justify-between p-3 rounded-md border", task.status === 'Done' && "bg-muted/50")}
        >
          <div className="flex items-center gap-3">
            <Checkbox id={task._id} checked={task.status === 'Done'} onCheckedChange={() => onToggle(task._id ?? '')} />
            <label
              htmlFor={task._id}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                task.status === 'Done' && "line-through text-muted-foreground",
              )}
            >
              {task.name}
            </label>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task._id ?? '')}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete task</span>
          </Button>
        </li>
      ))}
    </ul>
  )
}

