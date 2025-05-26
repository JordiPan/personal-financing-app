import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Item } from "../../../../api/interfaces/item/Item";

interface Props {
  stepState: { data: number; setData: Dispatch<SetStateAction<number>> };
  existingItemsState: {
    data: Omit<Item, "id">[];
    setData: Dispatch<SetStateAction<Omit<Item, "id">[]>>;
  };
  newItemsState: {
    data: Omit<Item, "id">[];
    setData: Dispatch<SetStateAction<Omit<Item, "id">[]>>;
  };
}
export const TransactionItemsForm = ({
  stepState,
  existingItemsState,
  newItemsState,
}: Props) => {
  useEffect(() => {});

  return (
    <>
      <h1>Step {stepState.data} | Items bought in transaction</h1>
      <form className="transaction-form default-form-container container-color-dark">
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
          <button className="container-color-dark form-button">
            Add existing item
          </button>
          <button className="container-color-dark form-button">
            Add new item
          </button>
        </div>
      </form>
    </>
  );
};
