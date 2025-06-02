import { useEffect, useRef, useState } from "react";
import { Transaction } from "../../../api/interfaces/transaction/Transaction";
import { TransactionInfoForm } from "./form-components/TransactionInfoForm";
import { TransactionItemsForm } from "./form-components/TransactionItemsForm";
import { TransactionOverview } from "./form-components/TransactionOverview";
import { NewTransactionItem } from "../../../api/interfaces/transaction/NewTransactionItem";
import { useNavigate } from "react-router-dom";
import { ExistingTransactionItem } from "../../../api/interfaces/transaction/ExistingTransactionItem";
import { createTransaction } from "../../../api/apiBackendServices";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { CreateTransactionRequest } from "../../../api/interfaces/transaction/CreateTransactionRequest";

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
  const [existingItems, setExistingItems] = useState<ExistingTransactionItem[]>(
    []
  );
  const [newItems, setNewItems] = useState<NewTransactionItem[]>([]);
  const validationRef = useRef<{ validate: () => boolean }>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const axiosPrivate = useAxiosPrivate();
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
      step={step}
      transactionState={transactionState}
      ref={validationRef}
    />,
    <TransactionItemsForm
      step={step}
      existingItemsState={existingItemsState}
      newItemsState={newItemsState}
      errorMessage={errorMessage}
    />,
    <TransactionOverview
      step={step}
      transactionState={transactionState}
      existingItems={existingItems}
      newItems={newItems}
    />,
  ];

  const handleSteps = (direction: number) => {
    switch (step) {
      case 1: {
        if (direction !== 1) {
          setStep((prev) => (prev += direction));
          break;
        }
        if (validationRef.current?.validate()) {
          setStep((prev) => (prev += direction));
        }
        break;
      }
      case 2: {
        setErrorMessage("");
        if (direction !== 1) {
          setStep((prev) => (prev += direction));
          break;
        }
        if (existingItems.length !== 0 || newItems.length !== 0) {
          setStep((prev) => (prev += direction));
        } else {
          setErrorMessage("Select at least 1 item!");
        }
        break;
      }
      default: {
        setStep((prev) => (prev += direction));
      }
    }
    // setStep((prev) => prev+=direction)
  };
  const handleSubmit = async () => {
    console.log("submitted!!")
    const transaction: CreateTransactionRequest = {
      ...transactionInfo,
      existingItems: [...existingItems],
      newItems: [...newItems],
    };
    // console.log(transaction);
    createTransaction(transaction, axiosPrivate)
      .then((res) => {})
      .catch((res) => {})
      .finally(() => {
        navigate("/dashboard");
      });
  };

  return (
    <div className="container container-color-dark">
      {forms[step - 1]}
      <div className="button-group">
        {step - 1 > 0 ? (
          <button className="form-button" onClick={() => handleSteps(-1)}>
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
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        ) : (
          <button className="form-button" onClick={() => handleSteps(1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
