import { useState, useEffect } from "react";
import { AxiosInstance } from "axios";
import { useParams } from "react-router-dom";
import { getItemsInCategory } from "../../../api/apiBackendServices";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import Loading from "../../Loading";
import { Item } from "../../../api/interfaces/item/Item";

export const CategoryTransactions = () => {
  const { slug } = useParams();
  const id = slug?.split("-").pop() || "";
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    document.title = slug || "Category";
    getItemsInCategory(id, axiosPrivate)
      .then((res) => {
        console.log(res.data.message);
        setItems(res.data.items);
      })
      .catch((res) => {
        if (res.response?.status === 404) {
          console.log("No transactions found");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
  return (
    <Loading isLoading={isLoading}>
      {items.length !== 0 ? (
        <>
          {items.map((item) => {
            <>
              <h1>{item.name}</h1>
              <h2>{item.description}</h2>
            </>;
          })}
        </>
      ) : (
        <>No items found...</>
      )}
    </Loading>
  );
};
