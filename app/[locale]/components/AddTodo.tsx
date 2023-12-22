"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./TodoForm";
import Modal from "./Modal";

interface AddTodoProps {
  btnText: string;
  addTodoText: string;
  typeHereText: string;
  submitText: string;
}
const AddTodo: React.FC<AddTodoProps> = ({
  btnText,
  addTodoText,
  typeHereText,
  submitText,
}) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTodoValue, setNewTodoValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newTodoValue.trim() === "") return;
    try {
      await addTodo({
        id: uuidv4(),
        text: newTodoValue,
        completed: false,
      });
      setNewTodoValue("");
      setModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error while creating a new todo:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 text-white border-none"
      >
        {btnText} <AiOutlinePlus className="ml-2" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <TodoForm
          title={addTodoText}
          onSubmit={handleSubmitNewTodo}
          value={newTodoValue}
          onChange={setNewTodoValue}
          typeHereText={typeHereText}
          submitText={submitText}
        />
      </Modal>
    </div>
  );
};

export default AddTodo;
