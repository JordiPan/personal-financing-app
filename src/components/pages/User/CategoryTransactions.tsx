import { useState, useEffect } from "react";
import { AxiosInstance } from "axios";
import { useParams } from "react-router-dom";
import { getTransactions } from "../../../api/apiBackendServices";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import Loading from "../../Loading";

export const CategoryTransactions = () => {
  const { slug } = useParams();
  const id = slug?.split("-").pop() || "";
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getTransactions(id, axiosPrivate)
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log(res)
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
  return (
    <Loading isLoading={isLoading}>
      <>transactions in category</>
    </Loading>
  );
};
