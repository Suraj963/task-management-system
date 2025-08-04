import { Button } from "react-bootstrap";
import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";

const TaskActions = ({ task, onEdit, onDelete }) => (
  <div className="d-flex justify-content-end">
    <Button
      variant="link"
      className="text-secondary p-1 me-2"
      onClick={() => onEdit(task)}
      title="Edit Task"
    >
      <PencilSquare size={18} />
    </Button>
    <Button
      variant="link"
      className="text-danger p-1"
      onClick={() => onDelete(task.id)}
      title="Delete Task"
    >
      <Trash3Fill size={18} />
    </Button>
  </div>
);

export default TaskActions;
