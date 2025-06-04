import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemsInCategory } from "../../../api/apiBackendServices";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import Loading from "../../Loading";
import { FullInfoItem } from "../../../api/interfaces/item/FullInfoItem";

export const CategoryItems = () => {
  const { slug } = useParams();
  const id = slug?.split("-").pop() || "";
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<FullInfoItem[]>([]);
  useEffect(() => {
    document.title = slug || "Category";
    getItemsInCategory(id, axiosPrivate)
      .then((res) => {
        console.log(res.data.items);
        setItems(res.data.items);
      })
      .catch((res) => {
        console.log(res);
        if (res.response?.status === 404) {
          console.log("No transactions found");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const truncate = (string: string) => {
    return string.length > 50 ? string.slice(0, 50) + '...' : string;
  }
  return (
    <Loading isLoading={isLoading}>
      <div className="category-items-list buttons-list">
        {items.length !== 0 ? (
          <>
            {items.map((item, key) => (
              <div className="category-item container-color-dark form-button" key={key}>
                <p className="item-name">{item.name}</p>
                <hr />
                <p className="item-description">{item.description ? truncate(item.description) : 'No description provided...'}</p>
                <hr />
                <p className="item-country">Country: {item.country.name}</p>
                <hr />
                <p className="item-price">Price: {item.price}</p>
                <hr />
                <p className="item-sellable">Sellable: {item.sellable ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </>
        ) : (
          <>No items found...</>
        )}
      </div>
    </Loading>
  );
};
