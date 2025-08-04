import React, { useState, useEffect, useCallback } from "react";
import { Container, Card } from "react-bootstrap";
import TasksHeader from "./TaskHeader";
import TasksFilter from "./TasksFilter";
import TaskListTable from "../../../layout/Components/TaskList";
import CreateTaskModal from "../../../layout/Components/CreateTaskModal";
import {
  addData,
  deleteDataById,
  getAllData,
  updateData,
  updateTaskStatus,
} from "../Services";
import SuccessSnackbar from "../../../common/Components/SuccessSnackbar";
import ErrorSnackbar from "../../../common/Components/ErrorSnackbar";
import { debounce } from "../../../utils";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // State for Snackbar
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
    setTaskToEdit(null);
  };
  const handleShowModal = () => setShowModal(true);

  // SEARCH TASK FUNCTIONALITY
  const fetchAllData = async (search = searchTerm, status = statusFilter) => {
    try {
      setLoading(true);
      const params = {
        search: search.trim(),
        status: status === "All" ? "" : status,
      };
      const data = await getAllData(params);
      setTasks(data.payLoad);
    } catch (error) {
      setErrorMessage("Failed to fetch tasks. Please try again.");
      setShowErrorSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  // DEBOUNCE FUNCTIONLAITY FOR SEARCHING
  const debouncedFetchData = useCallback(
    debounce((search, status) => {
      fetchAllData(search, status);
    }, 500),
    []
  );

  // ADD TASK FUNCTIONALITY
  const handleSaveTask = async (taskData) => {
    const isEditing = !!taskToEdit;
    const originalTasks = tasks;

    if (isEditing) {
      setTasks(
        tasks.map((task) =>
          task.id === taskToEdit.id ? { ...task, ...taskData } : task
        )
      );
      handleUpdateTask(taskData);
      return;
    } else {
      setTasks([...tasks, { ...taskData, id: Date.now() }]);
    }
    handleCloseModal();

    try {
      const data = await addData(taskData);
      if (data.status === 200) {
        setSuccessMessage("Task added successfully!");
        setShowSuccessSnackbar(true);
        fetchAllData();
      } else {
        throw new Error(`API returned status ${data.status}`);
      }
    } catch (error) {
      setErrorMessage("Failed to save the task. Please try again.");
      setShowErrorSnackbar(true);
      setTasks(originalTasks);
      console.error("Failed to save the task:", error);
    }
  };

  // UPDATE TASK FUNCTIONALITY
  const handleUpdateTask = async (taskData) => {
    try {
      const data = await updateData(taskData);
      if (data.status === 200) {
        setSuccessMessage("Task updated successfully!");
        setShowSuccessSnackbar(true);
        fetchAllData();
      } else {
        throw new Error(`API returned status ${data.status}`);
      }

      handleCloseModal();
    } catch (error) {}
  };

  const handleEditTask = async (task) => {
    setTaskToEdit(task);
    handleShowModal();
  };

  // DELETE TASK FUNCTIONALITY
  const handleDeleteTask = async (taskId) => {
    try {
      const data = await deleteDataById(taskId);
      if (data.status === 200) {
        setSuccessMessage("Task deleted successfully!");
        setShowSuccessSnackbar(true);
        fetchAllData();
      } else {
        throw new Error(`API returned status ${data.status}`);
      }
    } catch (error) {}
  };

  //  STATUS CHANGE FUNCTIONALITY
  const handleToggleComplete = async (status, taskId) => {
    try {
      const params = {
        status: status === "Completed" ? "Pending" : "Completed",
        taskId,
      };

      const data = await updateTaskStatus(params);
      if (data.status === 200) {
        setTasks(
          tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: task.status === "Completed" ? "Pending" : "Completed",
                }
              : task
          )
        );
        setSuccessMessage("Task status updated successfully!");
        setShowSuccessSnackbar(true);
      }
    } catch (error) {}
  };

  //  SEARCH CHANGE FUNCTIONALITY
  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    debouncedFetchData(newSearchTerm, statusFilter);
  };

  const handleStatusChange = (newStatus) => {
    setStatusFilter(newStatus);
    fetchAllData(searchTerm, newStatus);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <Container className="py-4">
      {/* TASK PAGE HEADER */}
      <TasksHeader onCreateTaskClick={handleShowModal} />
      <TasksFilter
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        loading={loading}
      />
      {/* TASK LIST TABLE */}
      <Card>
        <Card.Body>
          <TaskListTable
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            loading={loading}
          />
        </Card.Body>
      </Card>

      {/* TASK CREATE MODAL */}
      <CreateTaskModal
        show={showModal}
        handleClose={handleCloseModal}
        onSave={handleSaveTask}
        editingTask={taskToEdit}
      />

      {/* SUCCESS SNACKBAR COMPONENT */}
      <SuccessSnackbar
        show={showSuccessSnackbar}
        message={successMessage}
        onClose={() => setShowSuccessSnackbar(false)}
      />

      {/* ERROR SNACKBAR COMPONENT */}
      <ErrorSnackbar
        show={showErrorSnackbar}
        message={errorMessage}
        onClose={() => setShowErrorSnackbar(false)}
      />
    </Container>
  );
};

export default TasksPage;
