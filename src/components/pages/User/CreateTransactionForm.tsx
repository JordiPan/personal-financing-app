import { useEffect, useState } from "react";
import { Transaction } from "../../../api/interfaces/transaction/Transaction";
import { Item } from "../../../api/interfaces/item/Item";
import { TransactionInfoForm } from "./sub-components/TransactionInfoForm";
import { TransactionItemsForm } from "./form-components/TransactionItemsForm";
import { TransactionOverview } from "./form-components/TransactionOverview";

export const CreateTransactionForm = () => {
  const date = new Date();
  const templateTransaction: Omit<Transaction, "id"> = {
    name: "",
    description: "",
    recurrence: "once",
    date: date.toISOString().split('T')[0],
    is_item: true,
    total: 0,
    active: true,
  };
  const [step, setStep] = useState<number>(1);
  const [transactionInfo, setTransactionInfo] = useState<Omit<Transaction, "id">>(templateTransaction);
  const [existingItems, setExistingItems] = useState<Item[]>([]);
  const [newItems, setNewItems] = useState<Omit<Item, "id">[]>([]);

  const stepState = {data: step, setData: setStep};
  const transactionState = {data: transactionInfo, setData: setTransactionInfo};
  const existingItemsItemsState = {data: existingItems, setData: setExistingItems};
  const newItemsState = {data: newItems, setData: setNewItems};
  
  useEffect(() => {
    document.title = `Create transaction | Step ${step}`;
  });
  const forms = [
    <TransactionInfoForm stepState={stepState} transactionState={transactionState}/>,
    <TransactionItemsForm step={step} setStep={setStep} />,
    <TransactionOverview step={step} setStep={setStep} />,
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted!!");
  };

  return (
    <div className="container container-color-dark">
      {forms[step - 1]}
      <div className="button-group">
        {step-1 > 0 ? (
          <button
            className="form-button"
            onClick={() => {
              setStep((prev) => (prev -= 1));
            }}
          >
            back
          </button>
        ) : (
          <button className="form-button inactive">back</button>
        )}

        {step >= forms.length ? (
          <button
            className="form-button"
            onClick={() => {
              handleSubmit;
            }}
          >
            submit
          </button>
        ) : (
          <button
            className="form-button"
            onClick={() => {
              setStep((prev) => (prev += 1));
            }}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};
