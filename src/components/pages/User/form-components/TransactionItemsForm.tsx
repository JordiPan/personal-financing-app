import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AddExistingItemForm } from "./AddExistingItemForm";
import { AddNewItemForm } from "./AddNewItemForm";
import { NewTransactionItem } from "../../../../api/interfaces/transaction/NewTransactionItem";
import { ExistingTransactionItem } from "../../../../api/interfaces/transaction/ExistingTransactionItem";
interface Props {
  stepState: { data: number; setData: Dispatch<SetStateAction<number>> };
  existingItemsState: {
    data: ExistingTransactionItem[];
    setData: Dispatch<SetStateAction<ExistingTransactionItem[]>>;
  };
  newItemsState: {
    data: NewTransactionItem[];
    setData: Dispatch<SetStateAction<NewTransactionItem[]>>;
  };
}

export const TransactionItemsForm = ({
  stepState,
  existingItemsState,
  newItemsState,
}: Props) => {
  const [showExistingItemForm, setShowExistingItemForm] = useState(false);
  const [showNewItemForm, setShowNewItemForm] = useState(false);

  const handleDelete = (
    setter:
      | Dispatch<SetStateAction<ExistingTransactionItem[]>>
      | Dispatch<SetStateAction<NewTransactionItem[]>>,
    index: number
  ) => {
    //any should be removed and handledelete should be seperated
    setter((prev: any) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };
  return (
    <>
      <h1>Step {stepState.data} | Items bought in transaction</h1>
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
          <div className="items-list">
            {existingItemsState.data.map((item, key) => (
              <div className="item" key={key}>
                <p className="item-text">
                  {item.name} | {item.price} | x{item.quantity}
                </p>
                <div className="item-button-group">
                  <button className="form-button">edit</button>
                  <button
                    className="form-button"
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
                  <button className="form-button">edit</button>
                  <button
                    className="form-button"
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
        </form>
      )}
    </>
  );
};
