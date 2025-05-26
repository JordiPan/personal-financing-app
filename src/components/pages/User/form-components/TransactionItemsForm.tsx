import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AddExistingItemForm } from "./addExistingItemForm";
import { AddNewItemForm } from "./AddNewItemForm";
import { TransactionItem } from "../../../../api/interfaces/transaction/TransactionItem";


interface Props {
  stepState: { data: number; setData: Dispatch<SetStateAction<number>> };
  existingItemsState: {
    data: TransactionItem[];
    setData: Dispatch<SetStateAction<TransactionItem[]>>;
  };
  newItemsState: {
    data: TransactionItem[];
    setData: Dispatch<SetStateAction<TransactionItem[]>>;
  };
}

export const TransactionItemsForm = ({
  stepState,
  existingItemsState,
  newItemsState,
}: Props) => {
  const [showExistingItemForm, setShowExistingItemForm] = useState(false);
  const [showNewItemForm, setShowNewItemForm] = useState(false);

  useEffect(() => {});

  return (
    <>
      <h1>Step {stepState.data} | Items bought in transaction</h1>
      {showExistingItemForm || showNewItemForm ? (
        showExistingItemForm ? (
          <AddExistingItemForm
            setShowExistingItemForm={setShowExistingItemForm}
          />
        ) : (
          <AddNewItemForm setShowNewItemForm={setShowNewItemForm} />
        )
      ) : (
        <form className="transaction-form default-form-container">
          <div className="items-list">
            <div className="item">
              <p className="item-text">Ackahol | -20.23 | x3</p>
              <div className="item-button-group">
                <button className="form-button">edit</button>
                <button className="form-button">remove</button>
              </div>
            </div>
            <div className="item">
              <p className="item-text">Medicine | -20.23 | x1</p>
              <div className="item-button-group">
                <button className="form-button">edit</button>
                <button className="form-button">remove</button>
              </div>
            </div>
            <div className="item">
              <p className="item-text">Back Alley BJ | -290.23 | x3</p>
              <div className="item-button-group">
                <button className="form-button">edit</button>
                <button className="form-button">remove</button>
              </div>
            </div>
            <div className="item">
              <p className="item-text">Ackahol | -20.23 | x3</p>
              <div className="item-button-group">
                <button className="form-button">edit</button>
                <button className="form-button">remove</button>
              </div>
            </div>
            <div className="item">
              <p className="item-text">Ackahol | -20.23 | x3</p>
              <div className="item-button-group">
                <button className="form-button">edit</button>
                <button className="form-button">remove</button>
              </div>
            </div>
          </div>
          <div className="add-button-group">
            <button
              className="container-color-dark form-button"
              onClick={() => {
                setShowExistingItemForm(true);
              }}
            >
              Add existing item
            </button>
            <button
              className="container-color-dark form-button"
              onClick={() => {
                setShowNewItemForm(true);
              }}
            >
              Add new item
            </button>
          </div>
        </form>
      )}
    </>
  );
};
