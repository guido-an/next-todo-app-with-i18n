"use client";

import { ITodo } from "@/types/todo";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import Modal from "./Modal";
import TodoForm from "./TodoForm";

interface TodoProps {
  todo: ITodo;
  editTodoText: string;
  typeHereText: string;
  submitText: string;
  areYouSureText: string;
  yesText: string;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  editTodoText,
  typeHereText,
  submitText,
  areYouSureText,
  yesText,
}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [todoToEdit, setTodoToEdit] = useState<string>(todo.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await editTodo({
        ...todo,
        text: todoToEdit,
      });
      setOpenModalEdit(false);
      router.refresh();
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setOpenModalDeleted(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodoCompletion = async () => {
    try {
      await editTodo({
        ...todo,
        completed: !todo.completed,
      });
      router.refresh();
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  return (
    <tr key={todo.id}>
      <td
        className={`w-full ${
          todo.completed ? "line-through" : ""
        } cursor-pointer`}
        onClick={toggleTodoCompletion}
      >
        {todo.text}
      </td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={18}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <TodoForm
            title={editTodoText}
            onSubmit={handleSubmitEditTodo}
            value={todoToEdit}
            onChange={setTodoToEdit}
            typeHereText={typeHereText}
            submitText={submitText}
          />
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={18}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">{areYouSureText}</h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="btn bg-blue-500 hover:bg-blue-600 border-none w-24"
            >
              {yesText}
            </button>
          </div>
        </Modal>
        {todo.completed ? (
          <FiCheck
            onClick={toggleTodoCompletion}
            size={18}
            className="cursor-pointer text-green-500"
          />
        ) : (
          <>
            <span className="w-5 h-5 inline-block" />
          </>
        )}
      </td>
    </tr>
  );
};

export default Todo;
