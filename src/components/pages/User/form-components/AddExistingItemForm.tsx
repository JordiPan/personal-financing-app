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
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [chosenItems, setChosenItems] = useState<ExistingTransactionItem[]>(
    existingItemsState.data
  );
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
  const handleSelect = (selectedItem: Item) => {
    setChosenItems((prev: ExistingTransactionItem[]) => {
      const selected = prev.some(
        (chosenItem) => chosenItem.id === selectedItem.id
      );
      if (selected) {
        const filtered = prev.filter((item) => {
          return item.id !== selectedItem.id;
        });
        return filtered;
      }
      return [{ ...selectedItem, quantity: 1 }, ...prev];
    });
  };

  const handleQuantity = (itemId: number, direction: number) => {
    setChosenItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + direction };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    existingItemsState.setData(chosenItems);
    setShowExistingItemForm(false);
  };
  return (
    //make this mobile friendly later
    <form className="default-form-container" onSubmit={handleSubmit}>
      <p>Existing items list to choose from</p>
      <div className="existing-items-list items-list">
        <Loading isLoading={isLoading}>
          {items.length !== 0 ? (
            items.map((item, key) => {
              const chosen = chosenItems.some(
                (chosenItem) => chosenItem.id === item.id
              );
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
        {chosenItems.length !== 0 ? (
          chosenItems.map((item, key) => (
            <>
              <div className="chosen-item item" key={key}>
                <p className="item-text">
                  {item.name} | {item.price}
                </p>
                <div className="chosen-item-button-group">
                  <button
                    type="button"
                    className="form-button"
                    onClick={() => handleQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  {/* change to input later */}
                  <p className="quantity-number">{item.quantity}</p>
                  <button
                    type="button"
                    className="form-button"
                    onClick={() => handleQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          ))
        ) : (
          <p>Nothing chosen</p>
        )}
      </div>
      <input type="submit" value="Add Item(s)" className="form-button" />

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
