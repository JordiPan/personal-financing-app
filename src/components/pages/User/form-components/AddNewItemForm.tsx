import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NewTransactionItem } from "../../../../api/interfaces/transaction/NewTransactionItem";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { getCountriesAndCategories } from "../../../../api/apiBackendServices";
import { Category } from "../../../../api/interfaces/category/Category";
import { Country } from "../../../../api/interfaces/country/Country";
import Loading from "../../../Loading";

interface Props {
  setShowNewItemForm: Dispatch<SetStateAction<boolean>>;
  newItemsState: {
    data: NewTransactionItem[];
    setData: Dispatch<SetStateAction<NewTransactionItem[]>>;
  };
}
//TODO: IMPLEMENT CACHING THE DB RESULTS LATER
export const AddNewItemForm = ({ setShowNewItemForm, newItemsState }: Props) => {
  const [item, setItem] = useState<NewTransactionItem>({
    name: "",
    description: "",
    price: "",
    country: 1,
    category: 1,
    sellable: false,
    quantity: 1,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<Omit<Category, "description">[]>(
    []
  );
  const [countries, setCountries] = useState<Country[]>([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const get = () => {
      getCountriesAndCategories(axiosPrivate)
        .then((res) => {
          setSuccess(true);
          setCategories(res.data.categories);
          setCountries(res.data.countries);
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newItemsState.data.push(item);
    setShowNewItemForm(false);
  };
  return (
    <form className="default-form-container" onSubmit={handleSubmit}>
      <Loading isLoading={isLoading}>
        {success ? (
          <>
            <div className="input-group">
              <label htmlFor="name-input" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name-input"
                className="input"
                maxLength={20}
                required
                value={item.name}
                placeholder="Watermelon"
                onChange={(e) => {
                  setItem((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="desc">Description</label>
              <textarea
                name="description"
                maxLength={100}
                id="desc"
                className="input"
                value={item.description}
                placeholder="300g watermelon AH"
                onChange={(e) => {
                  setItem((prev) => ({ ...prev, description: e.target.value }));
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                step=".01"
                min="0"
                className="input"
                required
                value={item.price}
                onChange={(e) => {
                  //enforce only 2 decimals
                  if (/^\d*\.?\d{0,2}$/.test(e.target.value)) {
                    setItem((prev) => ({ ...prev, price: e.target.value }));
                  }
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                step="1"
                min="1"
                className="input"
                required
                value={item.quantity}
                onChange={(e) => {
                  //enforce whole numbers
                  if (/^\d*$/.test(e.target.value)) {
                    setItem((prev) => ({
                      ...prev,
                      quantity: Number(e.target.value),
                    }));
                  }
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="item-country">Country</label>
              <select
                name="select"
                id="item-country"
                value={item.country}
                className="input"
                required
                onChange={(e) => {
                  setItem((prev) => ({
                    ...prev,
                    country: Number(e.target.value),
                  }));
                }}
              >
                {countries.map((country, key) => {
                  return (
                    <option key={key} value={country.id}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* TODO: IF NO CATEGORY MAKE IT IMPOSSIBLE TO MAKE AN ITEM */}
            {/* TODO: ALSO DON'T DO SELECT IF CATEGORY LIST GETS TOO LONG */}
            <div className="input-group">
              <label htmlFor="item-category">Category</label>
              <select
                name="select"
                id="item-category"
                className="input"
                required
                onChange={(e) => {
                  setItem((prev) => ({
                    ...prev,
                    category: Number(e.target.value),
                  }));
                }}
              >
                <option value="" disabled hidden selected>
                  -- Select an option --
                </option>
                {categories.map((category, key) => {
                  return (
                    <option key={key} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="item-sellable">Is it resellable?</label>
              <select
                name="select"
                id="item-sellable"
                value={String(item.sellable)}
                className="input"
                required
                onChange={(e) => {
                  setItem((prev) => ({
                    ...prev,
                    sellable: Boolean(e.target.value),
                  }));
                }}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <input type="submit" value="Add Item" className="form-button" />
          </>
        ) : (
          <>Something went wrong... try again later</>
        )}
      </Loading>

      <button
        className="back-button form-button"
        type="button"
        onClick={() => {
          setShowNewItemForm(false);
        }}
      >
        Back to list
      </button>
    </form>
  );
};
