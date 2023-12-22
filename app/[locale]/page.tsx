import { getAllTodos } from "@/api";
import { getTranslations } from "next-intl/server";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import LocaleSwitcher from "./components/LocaleSwitcher";

export default async function Home() {
  const todos = await getAllTodos();
  const t = await getTranslations();

  return (
    <main className="max-w-4xl mx-auto mt-4 px-4 sm:px-6">
      <div className="text-center my-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{t("Home.title")}</h1>
          <LocaleSwitcher />
        </div>
        <AddTodo
          btnText={t("AddTodo.btnText")}
          addTodoText={t("TodoForm.addToDoText")}
          typeHereText={t("common.typeHereText")}
          submitText={t("common.submitText")}
        />
      </div>
      <TodoList todos={todos} />
    </main>
  );
}
