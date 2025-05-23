import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Transaction } from "../../../../api/interfaces/transaction/Transaction";

interface Props {
  stepState: { data: number; setData: Dispatch<SetStateAction<number>> };
  transactionState: {
    data: Omit<Transaction, "id">;
    setData: Dispatch<SetStateAction<Omit<Transaction, "id">>>;
  };
}
//maybe add another date field for weekly/monthly/yearly recurrence
//Sanitization, dont forget
export const TransactionInfoForm = ({ stepState, transactionState }: Props) => {
  useEffect(() => {});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted!!");
  };

  const handleRecurrence = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    transactionState.setData((prev) => ({
      ...prev,
      recurrence: e.target.value,
    }));
  };
  const handleIsItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "true";
    transactionState.setData((prev) => ({
      ...prev,
      is_item: value,
    }));
  };
  const handleActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "true";
    transactionState.setData((prev) => ({
      ...prev,
      active: value,
    }));
  };
  return (
    <>
      <h1>Step {stepState.data} | Basic info</h1>
      <form
        className="create-category-form container-color-dark"
        onSubmit={handleSubmit}
      >
        <label htmlFor="transaction-name">Name</label>
        <input
          name="name"
          maxLength={20}
          type="text"
          id="transaction-name"
          className="input"
          required
          value={transactionState.data.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            transactionState.setData((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
        />
        <label htmlFor="transaction-desc">Description</label>
        <textarea
          name="description"
          maxLength={100}
          id="transaction-desc"
          className="input"
          value={transactionState.data.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            transactionState.setData((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        ></textarea>
        <label htmlFor="transaction-recurrence">Recurrence</label>
        <select
          name="select"
          id="transaction-recurrence"
          value={transactionState.data.recurrence}
          className="input"
          required
          onChange={handleRecurrence}
        >
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <label htmlFor="transaction-date">Purchase date</label>
        <input
          name="date"
          type="date"
          id="transaction-date"
          className="input"
          value={transactionState.data.date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            transactionState.setData((prev) => ({
              ...prev,
              date: e.target.value,
            }));
          }}
        />
        <label htmlFor="transaction-is-item">
          Is it an item?/Is it resellable?
        </label>
        <select
          name="select"
          id="transaction-is-item"
          className="input"
          required
          value={String(transactionState.data.is_item)}
          onChange={handleIsItem}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {/* this is actually only for recurring purchases */}
        <label htmlFor="transaction-active">Is it ongoing at the moment?</label>
        <select
          name="select"
          id="transaction-active"
          className="input"
          required
          value={String(transactionState.data.active)}
          onChange={handleActive}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </form>
    </>
  );
};
