import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ExistingTransactionItem } from "../../../../api/interfaces/transaction/ExistingTransactionItem";
import { NewTransactionItem } from "../../../../api/interfaces/transaction/NewTransactionItem";
import { Transaction } from "../../../../api/interfaces/transaction/Transaction";

type Props = {
  step: number;
  existingItems: ExistingTransactionItem[];
  transactionState: {
    data: Omit<Transaction, "id">;
    setData: Dispatch<SetStateAction<Omit<Transaction, "id">>>;
  };
  newItems: NewTransactionItem[];
};
export const TransactionOverview = ({
  step,
  transactionState,
  existingItems,
  newItems
}: Props) => {
  useEffect(() => {
    let total = 0;
    existingItems.map((item) => {
      total += Number(item.price) * item.quantity;
    });
    newItems.map((item) => {
      total += Number(item.price) * item.quantity;
    });
    transactionState.setData((prev) => ({...prev, total: total}));
  }, []);
  return (
    <>
      <h1>Step {step} | Overview</h1>
      <div className="transaction-overview default-form-container">
        <div className="transaction-info">
          <p>Type: {transactionState.data.direction}</p>
          <p>Name: {transactionState.data.name}</p>
          <p>Description: {transactionState.data.description}</p>
          <p>Date of purchase: {transactionState.data.date}</p>
          <p>Recurrence: {transactionState.data.recurrence}</p>
        </div>
        <div className="items-overview">
          {/* make the item a collapsable element? */}
          <div className="existing-items-overview items-list">
            Existing
            {existingItems.map((item, key) => (
              <div className="item" key={key}>
                <p className="item-text">
                  {item.name} | {item.price} | {item.category} | x{item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="new-items-overview items-list">
            New
            {newItems.map((item, key) => (
              <div className="item" key={key}>
                <p className="item-text">
                  {item.name} | {item.price} | {item.category} | x{item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p>Total amount: {transactionState.data.total.toFixed(2)}</p>
      </div>
    </>
  );
};
