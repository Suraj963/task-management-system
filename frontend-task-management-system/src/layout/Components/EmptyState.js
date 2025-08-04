import { ListTask } from "react-bootstrap-icons";

const EmptyState = () => (
  <div className="text-center p-5 my-4">
    <ListTask size={52} className="text-muted mb-4" />
    <h4 className="fw-bold">No Tasks Found</h4>
    <p className="text-secondary">No completed / pending tasks.</p>
  </div>
);

export default EmptyState;
