import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AddExistingItemForm } from "./AddExistingItemForm";
import { AddNewItemForm } from "./AddNewItemForm";
import { NewTransactionItem } from "../../../../api/interfaces/transaction/NewTransactionItem";
import { ExistingTransactionItem } from "../../../../api/interfaces/transaction/ExistingTransactionItem";
interface Props {
  step: number;
  existingItemsState: {
    data: ExistingTransactionItem[];
    setData: Dispatch<SetStateAction<ExistingTransactionItem[]>>;
  };
  newItemsState: {
    data: NewTransactionItem[];
    setData: Dispatch<SetStateAction<NewTransactionItem[]>>;
  };
  errorMessage: string;
}

export const TransactionItemsForm = ({
  step,
  existingItemsState,
  newItemsState,
  errorMessage
}: Props) => {
  const [showExistingItemForm, setShowExistingItemForm] = useState(false);
  const [showNewItemForm, setShowNewItemForm] = useState(false);

  const handleDelete = (
    setter:
      | Dispatch<SetStateAction<ExistingTransactionItem[]>>
      | Dispatch<SetStateAction<NewTransactionItem[]>>,
    index: number
  ) => {
    //any should be removed and handledelete should be seperated for clarity
    setter((prev: any) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  //backend needs to differentiate between existing (with ID) and new (without ID), that's why itemlists are separate
  return (
    <>
      <h1>Step {step} | Items bought in transaction</h1>
      {showExistingItemForm || showNewItemForm ? (
        showExistingItemForm ? (
          <AddExistingItemForm
            setShowExistingItemForm={setShowExistingItemForm}
            existingItemsState={existingItemsState}
          />
        ) : (
          <AddNewItemForm
            setShowNewItemForm={setShowNewItemForm}
            newItemsState={newItemsState}
          />
        )
      ) : (
        <form className="transaction-form default-form-container">
          <div className="add-button-group">
            <button
              type="button"
              className="container-color-dark form-button"
              onClick={() => {
                setShowExistingItemForm(true);
              }}
            >
              Add existing item
            </button>
            <button
              type="button"
              className="container-color-dark form-button"
              onClick={() => {
                setShowNewItemForm(true);
              }}
            >
              Add new item
            </button>
          </div>
          <div className="items-list">
            {existingItemsState.data.map((item, key) => (
              <div className="item" key={key}>
                <p className="item-text">
                  {item.name} | {item.price} | x{item.quantity}
                </p>
                <div className="item-button-group">
                  <button className="form-button inactive" type="button" disabled>edit</button>
                  <button
                    className="form-button"
                    type="button"
                    onClick={() =>
                      handleDelete(existingItemsState.setData, key)
                    }
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}

            {newItemsState.data.map((item, key) => (
              <div className="item" key={key}>
                <p className="item-text">
                  {item.name} | {item.price} | x{item.quantity}
                </p>
                <div className="item-button-group">
                  <button className="form-button inactive" type="button" disabled>edit</button>
                  <button
                    className="form-button"
                    type="button"
                    onClick={() => handleDelete(newItemsState.setData, key)}
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}

            {newItemsState.data.length === 0 &&
              existingItemsState.data.length === 0 && <p>No Items selected</p>}
          </div>
          <p className="error-message">{errorMessage}</p>
        </form>
      )}
    </>
  );
};
