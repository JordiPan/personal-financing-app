import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { getPaginateTransactions } from "../../../../api/apiBackendServices";
import Loading from "../../../Loading";
import { Transaction } from "../../../../api/interfaces/transaction/Transaction";
import { Item } from "../../../../api/interfaces/item/Item";

export const FilterTableModule = ({ option }: { option: string }) => {
  //TODO: make a11y ok?
  //For now only transactions
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Transaction[] | Item[]>([]);

  useEffect(() => {
    getPaginateTransactions(axiosPrivate)
      .then((res) => {
        console.log(res);
        setData(res.data.transactions);
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [option]);
  return (
    <Loading isLoading={isLoading}>
      <table className="filter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Resellable</th>
            <th>Country of origin</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => {
            return (
              <tr>
                <td>{transaction.name}</td>
                <td>Maria Anders</td>
                <td>Germany</td>
                <td>Germany</td>
                <td>Germany</td>
                <td>Germany</td>
                <td>edit/delete</td>
              </tr>
            );
          })}
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>edit/delete</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>edit/delete</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>edit/delete</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>edit/delete</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>edit/delete</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>{option}</td>
            <td>edit/delete</td>
          </tr>
        </tbody>
      </table>
    </Loading>
  );
};
