import { useEffect, useState } from "react";
import { getMonthlyOverview } from "../../../../api/apiBackendServices";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { Transaction } from "../../../../api/interfaces/transaction/Transaction";
import Loading from "../../../Loading";
import { useNavigate } from "react-router-dom";
export const MonthlyOverview = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [total, setTotal] = useState(0);
  const [incomeTransactions, setIncomeTransactions] = useState<Transaction[]>(
    []
  );
  const [expensesTransactions, setExpensesTransactions] = useState<
    Transaction[]
  >([]);
  useEffect(() => {
    getMonthlyOverview(axiosPrivate)
      .then((res) => {
        console.log(res.data);
        setExpensesTransactions(res.data.expenses);
        setIncomeTransactions(res.data.income);

        const totalExpenses = res.data.expenses.reduce(
          (sum, t) => sum + Number(t.total ?? 0),
          0
        );
        setTotalExpenses(totalExpenses);
        const totalIncome = res.data.income.reduce(
          (sum, t) => sum + Number(t.total ?? 0),
          0
        );
        setTotalIncome(totalIncome);

        console.log(totalExpenses, totalIncome);
        setTotal(getTotal(totalIncome, totalExpenses));
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getTotal = (income: number, expenses: number) => {
    return income - expenses;
  };
  return (
    <div className="transactions-container">
      <Loading isLoading={isLoading}>
        <div className="overview-title module-title">Monthly overview!!!</div>
        <div className="overview-container">
          <div className="income-transactions">
            <p className="overview-title module-title">Income</p>

            {incomeTransactions.length !== 0 ? (
              <>
                <div className="monthly-list">
                  {incomeTransactions.map((transaction) => {
                    const date = new Date(transaction.date).getDate();
                    return (
                      <div className="monthly-transaction" key={transaction.id}>
                        <p className="info">
                          {date} | {transaction.name}
                        </p>
                        <p className="transaction-total">{transaction.total}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="income-total total-row">
                  <p className="info">Total</p>
                  <p className="transaction-total">{totalIncome}</p>
                </div>
              </>
            ) : (
              <p className="nothing-text">No Income registered yet...</p>
            )}
          </div>

          <div className="expenses-transactions">
            <p className="overview-title module-title">Expenses</p>

            {expensesTransactions.length !== 0 ? (
              <>
                <div className="monthly-list">
                  {expensesTransactions.map((transaction) => {
                    const date = new Date(transaction.date).getDate();
                    const month = new Date().toLocaleString("en-US", {
                      month: "long",
                    });
                    return (
                      <div className="monthly-transaction" key={transaction.id}>
                        <p className="info">
                          {month} {date} | {transaction.name}
                        </p>
                        <p className="transaction-total">
                          -{transaction.total}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="expenses-total total-row">
                  <p className="info">Total:</p>
                  <p className="transaction-total">-{totalExpenses}</p>
                </div>
              </>
            ) : (
              <p className="nothing-text">No expenses registered yet...</p>
            )}
          </div>
        </div>
        <div className="overview-total">
          <p>Total spending power per month: {total}</p>
        </div>
      </Loading>
    </div>
  );
};
