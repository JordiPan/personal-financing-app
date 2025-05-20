import { useEffect, useState } from "react";
import { getRecentTransactions } from "../../../../api/apiBackendServices";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { Transaction } from "../../../../api/interfaces/transaction/Transaction";
import { AxiosInstance } from "axios";
import { NewTransactionForm } from "../form-components/NewTransactionForm";
// import { useNavigate } from "react-router-dom";

interface Props {
  axiosPrivate: AxiosInstance;
}
//grabs latest 5 transactions registered
export const LatestTransactions = ({ axiosPrivate }: Props) => {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    //not working atm
    // getRecentTransactions(axiosPrivate)
    // .then((res) => {
    // })
    // .then((res) => {
    //   console.log(res);
    // })
    // .finally(() => {
    //   setIsLoading(false);
    // })
  });
  //not complex enough to warrant a separate component
  return (
    <div className="transactions-container">
      <div className="transactions-title">Latest transactions (5)</div>
      <div className="latest-transactions">
        <button className="transaction form-button">
          Transaction test 1| 123,12
        </button>
        <button className="transaction form-button">
          Transaction test 2| 123,12
        </button>
        <button className="transaction form-button">
          Transaction test 3| 123,12
        </button>
        <button className="transaction form-button">
          Transaction test 4| 123,12
        </button>
        <button className="transaction form-button">
          Transaction test 5| 123,12
        </button>
      </div>
      <button
        className="make-transaction form-button"
        onClick={() => {
          setShowForm(true);
        }}
      >
        + Make a new Transaction!
      </button>
      {showForm ? (
        <NewTransactionForm
          setTransactions={setTransactions}
          setShowForm={setShowForm}
          axiosPrivate={axiosPrivate}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
