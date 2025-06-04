import { useEffect, useState } from "react";
import { getRecentTransactions } from "../../../../api/apiBackendServices";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { Transaction } from "../../../../api/interfaces/transaction/Transaction";
// import { useAuth } from "../../../../context/AuthContext";
import Loading from "../../../Loading";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

//grabs recent 5 transactions
export const LatestTransactions = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getRecentTransactions(axiosPrivate)
      .then((res) => {
        console.log(res.data.message);
        setTransactions(res.data.transactions);
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  //not complex enough to warrant a separate component
  return (
    <div className="transactions-container">
      <div className="transactions-title">Latest transactions (5)</div>
      <div className="latest-transactions">
        <Loading isLoading={isLoading}>
          {transactions.length !== 0 ? (
            <>
              {transactions.map((transaction) => {
                return (
                  <button className="transaction form-button" key={transaction.id}>
                    {transaction.name} | {transaction.recurrence} | {transaction.total}
                  </button>
                );
              })}
            </>
          ) : (
            <>No transactions made...</>
          )}
        </Loading>
      </div>
      <button
        className="make-transaction form-button"
        onClick={() => {
          navigate('/transactions/create');
        }}
      >
        + Register a new Transaction!
      </button>
    </div>
  );
};
