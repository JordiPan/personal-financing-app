import { Dispatch, SetStateAction, useState } from "react";
import { createCategory } from "../../../../api/apiBackendServices";
import { AxiosInstance } from "axios";
import { Transaction } from "../../../../api/interfaces/transaction/Transaction";

interface Props {
  setShowForm: (showForm: boolean) => void;
  axiosPrivate: AxiosInstance;
  setTransactions:  Dispatch<SetStateAction<Transaction[]>>;
}
export const NewTransactionForm = ({ setTransactions, setShowForm, axiosPrivate }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="dim-overlay">
      <form
        className="create-category-form container-color-dark"
        onSubmit={handleSubmit}
      >
        <h2>New Transaction</h2>
        <label htmlFor="category-name">Name</label>
        <input
          name="name"
          maxLength={20}
          type="text"
          id="category-name"
          className="input"
          required
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="category-desc">Description</label>
        <textarea
          name="description"
          maxLength={100}
          id="category-desc"
          className="input"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value);
          }}
        ></textarea>
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
