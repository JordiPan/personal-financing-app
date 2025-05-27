import { useEffect, useState } from "react";
import { Transaction } from "../../../api/interfaces/transaction/Transaction";
import { TransactionInfoForm } from "./form-components/TransactionInfoForm";
import { TransactionItemsForm } from "./form-components/TransactionItemsForm";
import { TransactionOverview } from "./form-components/TransactionOverview";
import { NewTransactionItem } from "../../../api/interfaces/transaction/NewTransactionItem";
import { useNavigate } from "react-router-dom";
import { ExistingTransactionItem } from "../../../api/interfaces/transaction/ExistingTransactionItem";

export const CreateTransactionForm = () => {
  const date = new Date();
  const templateTransaction: Omit<Transaction, "id"> = {
    name: "",
    description: "",
    direction: "subtract",
    recurrence: "once",
    date: date.toISOString().split("T")[0],
    total: 0,
    active: true,
  };
  const [step, setStep] = useState<number>(1);
  const [transactionInfo, setTransactionInfo] =
    useState<Omit<Transaction, "id">>(templateTransaction);
  const [existingItems, setExistingItems] = useState<ExistingTransactionItem[]>([]);
  const [newItems, setNewItems] = useState<NewTransactionItem[]>([]);

  const stepState = {
    data: step,
    setData: setStep,
  };
  const transactionState = {
    data: transactionInfo,
    setData: setTransactionInfo,
  };
  const existingItemsState = {
    data: existingItems,
    setData: setExistingItems,
  };
  const newItemsState = {
    data: newItems,
    setData: setNewItems,
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Create transaction | Step ${step}`;
  });
  const forms = [
    <TransactionInfoForm
      stepState={stepState}
      transactionState={transactionState}
    />,
    <TransactionItemsForm
      stepState={stepState}
      existingItemsState={existingItemsState}
      newItemsState={newItemsState}
    />,
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
        {step - 1 > 0 ? (
          <button
            className="form-button"
            onClick={() => {
              setStep((prev) => (prev -= 1));
            }}
          >
            Back
          </button>
        ) : (
          <button
            className="form-button"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Back
          </button>
        )}

        {step >= forms.length ? (
          <button
            className="form-button"
            onClick={() => {
              handleSubmit;
            }}
          >
            Submit
          </button>
        ) : (
          <button
            className="form-button"
            onClick={() => {
              setStep((prev) => (prev += 1));
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
