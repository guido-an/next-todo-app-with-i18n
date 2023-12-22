import React from "react";
import { ITodo } from "@/types/todo";
import { useTranslations } from "next-intl";
import Todo from "./Todo";

interface TodoListProps {
  todos: ITodo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const tTodoList = useTranslations("TodoList");
  const t = useTranslations();
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>{tTodoList("todosText")}</th>
            <th>{tTodoList("actionsText")}</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              editTodoText={t("TodoForm.editTodoText")}
              typeHereText={t("common.typeHereText")}
              submitText={t("common.submitText")}
              areYouSureText={t("common.areYouSureText")}
              yesText={t("common.yesText")}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
