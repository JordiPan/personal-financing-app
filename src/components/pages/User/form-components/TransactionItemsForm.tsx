import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Transaction } from "../../../../api/interfaces/transaction/Transaction";
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
export const TransactionItemsForm = ({ stepState, existingItemsState, newItemsState }: Props) => {
  useEffect(() => {});

  return (
    <>
      <h1>Step {stepState.data} | Items bought in transaction</h1>
      <form className="transaction-form default-form-container container-color-dark">
        <div className="input-group">
          
        </div>
      </form>
    </>
  );
};
