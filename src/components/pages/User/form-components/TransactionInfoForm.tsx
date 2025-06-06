import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Transaction } from "../../../../api/interfaces/transaction/Transaction";

interface Props {
  step: number;
  transactionState: {
    data: Omit<Transaction, "id">;
    setData: Dispatch<SetStateAction<Omit<Transaction, "id">>>;
  };
}

type validationRef = {
  validate: () => boolean;
};
//maybe add another date field for weekly/monthly/yearly recurrence
export const TransactionInfoForm = forwardRef<validationRef, Props>(
  ({ step, transactionState }, ref) => {
    const [showActive, setShowActive] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
      if (transactionState.data.recurrence !== "once") {
        setShowActive(true);
      }
    }, []);

    const handleRecurrence = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value !== "once") {
        setShowActive(true);
      } else {
        //even when not used a 'once' transaction is logically true to be active
        setShowActive(false);
        transactionState.setData((prev) => ({
          ...prev,
          active: true,
        }));
      }
      transactionState.setData((prev) => ({
        ...prev,
        recurrence: e.target.value,
      }));
    };

    const handleActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value === "true";
      transactionState.setData((prev) => ({
        ...prev,
        active: value,
      }));
    };
    const handleDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
      transactionState.setData((prev) => ({
        ...prev,
        direction: e.target.value,
      }));
    };

    useImperativeHandle(ref, () => ({
      validate: () => formRef.current?.reportValidity() ?? false,
    }));

    return (
      <>
        <h1>Step {step} | Basic info</h1>
        <form
          className="transaction-form default-form-container container-color-dark"
          ref={formRef}
        >
          <div className="input-group">
            <label htmlFor="transaction-direction">Type</label>
            <select
              name="select"
              id="transaction-direction"
              value={transactionState.data.direction}
              className="input"
              required
              onChange={handleDirection}
            >
              <option value="add">Positive</option>
              <option value="subtract">Negative</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="transaction-name">Name</label>
            <input
              name="name"
              maxLength={255}
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
          </div>
          <div className="input-group">
            <label htmlFor="transaction-desc">Description</label>
            <textarea
              name="description"
              maxLength={500}
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
          </div>
          <div className="input-group">
            <label htmlFor="transaction-date">Purchase date</label>
            <input
              name="date"
              type="date"
              id="transaction-date"
              className="input"
              min="1990-01-01"
              max="2040-12-31"
              value={transactionState.data.date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                transactionState.setData((prev) => ({
                  ...prev,
                  date: e.target.value,
                }));
              }}
            />
          </div>
          <div className="input-group">
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
          </div>
          {showActive && (
            <div className="input-group">
              {/* this is actually only for recurring purchases */}
              <label htmlFor="transaction-active">
                Is it active at the moment?
              </label>
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
            </div>
          )}
        </form>
      </>
    );
  }
);
