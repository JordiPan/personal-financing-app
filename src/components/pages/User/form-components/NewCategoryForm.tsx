import { Dispatch, SetStateAction, useState } from "react";
import { createCategory } from "../../../../api/apiBackendServices";
import { AxiosInstance } from "axios";
import { Category } from "../../../../api/interfaces/category/Category";

interface Props {
  setShowForm: (showForm: boolean) => void;
  axiosPrivate: AxiosInstance;
  setCategories: Dispatch<SetStateAction<Category[]>>;
}
export const NewCategoryForm = ({
  setCategories,
  setShowForm,
  axiosPrivate,
}: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCategory({ name, description }, axiosPrivate)
      .then((res) => {
        setCategories((prev) => [...prev, res.data.category]);
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        setShowForm(false);
      });
  };

  return (
    <div className="dim-overlay">
      <form
        className="create-category-form container-color-dark"
        onSubmit={handleSubmit}
      >
        <h2>New category</h2>
        <div className="input-group">
          <label htmlFor="category-name">Name</label>
          <input
            name="name"
            maxLength={40}
            type="text"
            id="category-name"
            className="input"
            required
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="category-desc">Description</label>
          <textarea
            name="description"
            maxLength={200}
            id="category-desc"
            className="input"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value);
            }}
           />
        </div>
        <input type="submit" className="form-button" />
        <button
          className="form-button"
          onClick={() => {
            setShowForm(false);
          }}
        >
          Back
        </button>
      </form>
    </div>
  );
};
