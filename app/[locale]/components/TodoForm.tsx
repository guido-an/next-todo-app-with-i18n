import { FormEventHandler } from "react";

interface TodoFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  value: string;
  onChange: (value: string) => void;
  title: string;
  typeHereText: string;
  submitText: string;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  value,
  onChange,
  title,
  typeHereText,
  submitText,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h3 className="font-bold text-lg text-center">{title}</h3>
      <div className="modal-action">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          placeholder={typeHereText}
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 border-none"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
