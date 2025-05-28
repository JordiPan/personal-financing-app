import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getUserItems } from "../../../../api/apiBackendServices";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { Item } from "../../../../api/interfaces/item/Item";
import Loading from "../../../Loading";
import { ExistingTransactionItem } from "../../../../api/interfaces/transaction/ExistingTransactionItem";

interface Props {
  setShowExistingItemForm: Dispatch<SetStateAction<boolean>>;
  existingItemsState: {
    data: ExistingTransactionItem[];
    setData: Dispatch<SetStateAction<ExistingTransactionItem[]>>;
  };
}

//maybe double width and have the lists side by side
export const AddExistingItemForm = ({
  setShowExistingItemForm,
  existingItemsState,
}: Props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<ExistingTransactionItem[]>([]);
  const [chosenItemIds, setChosenItemIds] = useState<number[]>([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const get = () => {
      getUserItems(axiosPrivate)
        .then((res) => {
          //kind of bad solution
          setItems(
            res.data.items.map((item) => {
              return { ...item, quantity: 1 };
            })
          );
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    get();
  }, []);

  //toggles selection
  const handleSelect = (item: Item) => {
    setChosenItemIds((prev: number[]) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  const handleIncrement = (itemId: number, direction: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + direction }
          : item
      ).filter(item => item.quantity <= 0)
    );
  };

  return (
    //make this mobile friendly later
    <form className="default-form-container" onSubmit={handleSubmit}>
      <p>Existing items list to choose from</p>
      <div className="existing-items-list">
        <Loading isLoading={isLoading}>
          {items.length !== 0 ? (
            items.map((item, key) => {
              const chosen = chosenItemIds.includes(item.id);
              return (
                <button
                  type="button"
                  className={
                    chosen
                      ? "existing-item item item-selected"
                      : "existing-item item"
                  }
                  key={key}
                  onClick={() => handleSelect(item)}
                >
                  <p className="item-text">
                    {item.name} | {item.price}
                  </p>
                </button>
              );
            })
          ) : (
            <>No existing items found...</>
          )}
        </Loading>
      </div>
      <p>Chosen Items</p>
      <div className="chosen-items-list items-list">
        {chosenItemIds.length !== 0 ? (
          items
            .filter((item) => chosenItemIds.includes(item.id))
            .map((item, key) => (
              <>
                <div className="chosen-item item" key={key}>
                  <p className="item-text">
                    {item.name} | {item.price}
                  </p>
                  <div className="chosen-item-button-group">
                    <button className="form-button" onClick={() => handleIncrement(item.id, -1)}>-</button>
                    {/* change to input later */}
                    <p className="quantity-number">{item.quantity}</p>
                    <button className="form-button" onClick={() => handleIncrement(item.id, 1)}>+</button>
                  </div>
                </div>
              </>
            ))
        ) : (
          <p>Nothing chosen</p>
        )}
      </div>
      <button
        type="button"
        className="back-button form-button"
        onClick={() => {
          setShowExistingItemForm(false);
        }}
      >
        Back to list
      </button>
    </form>
  );
};
