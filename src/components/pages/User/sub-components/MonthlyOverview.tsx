import { useEffect, useState } from "react";
import { getMonthlyOverview, getRecentTransactions } from "../../../../api/apiBackendServices";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { Transaction } from "../../../../api/interfaces/transaction/Transaction";
// import { useAuth } from "../../../../context/AuthContext";
import Loading from "../../../Loading";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

//grabs recent 5 transactions
export const MonthlyIncome = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [incomeTransactions, setIncomeTransactions] = useState<Transaction[]>([]);
  const [expensesTransactions, setExpensesTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getMonthlyOverview(axiosPrivate)
      .then((res) => {
        console.log(res.data);
        setExpensesTransactions(res.data.expenses);
        setIncomeTransactions(res.data.income);
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="transactions-container">
      <div className="transactions-title">Monthly overview!!!</div>
      <div className="income-transactions">
        <Loading isLoading={isLoading}>
          {incomeTransactions.length !== 0 ? (
            <>
              {incomeTransactions.map((transaction) => {
                return (
                  <button className="transaction form-button" key={transaction.id}>
                    {transaction.name} | {transaction.recurrence} | {transaction.total} | {transaction.date}
                  </button>
                );
              })}
            </>
          ) : (
            <>No Income registered yet...</>
          )}
        </Loading>
      </div>
      <div className="expenses-transactions">
        <Loading isLoading={isLoading}>
          {expensesTransactions.length !== 0 ? (
            <>
              {expensesTransactions.map((transaction) => {
                return (
                  <button className="transaction form-button" key={transaction.id}>
                    {transaction.name} | {transaction.recurrence} | {transaction.total} | {transaction.date}
                  </button>
                );
              })}
            </>
          ) : (
            <>No expenses registered yet...</>
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
