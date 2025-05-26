import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../../../../api/interfaces/user/User";
import { updateUser } from "../../../../api/apiBackendServices";
import { useAuth } from "../../../../context/AuthContext";
import { customjwtDecoder } from "../../../../api/CustomJwtDecoder";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";
import { Item } from "../../../../api/interfaces/item/Item";
import { TransactionItem } from "../../../../api/interfaces/transaction/TransactionItem";

interface Props {
  setShowNewItemForm: Dispatch<SetStateAction<boolean>>;
}

export const AddNewItemForm = ({ setShowNewItemForm }: Props) => {
  const [item, setItem] = useState<TransactionItem>({
    name: "",
    description: "",
    price: "",
    country: 1,
    category: 1,
    sellable: false,
    quantity: 1
  });
  useEffect(() => {
    //get the categories and countries to fill in here
  },[])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className="default-form-container" onSubmit={handleSubmit}>
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
              setItem((prev) => ({ ...prev, quantity: Number(e.target.value) }));
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
              setItem((prev) => ({ ...prev, country: Number(e.target.value) }));
            }}
          >
            <option value={1}>Netherlands</option>
            <option value={2}>China</option>
          </select>
        </div>
        {/* TODO: IF NO CATEGORY MAKE IT IMPOSSIBLE TO MAKE AN ITEM */}
        {/* TODO: ALSO DON'T DO SELECT IF CATEGORY LIST GETS TOO LONG */}
       <div className="input-group">
          <label htmlFor="item-category">Category</label>
          <select
            name="select"
            id="item-category"
            value={item.category}
            className="input"
            required
            onChange={(e) => {
              setItem((prev) => ({ ...prev, category: Number(e.target.value) }));
            }}
          >
            <option value={1}>Ur personal category</option>
            <option value={2}>The other one</option>
            <option value={3}>Groceries</option>
          </select>
        </div>
       <div className="input-group">
          <label htmlFor="item-sellable">Is it sellable?</label>
          <select
            name="select"
            id="item-sellable"
            value={String(item.sellable)}
            className="input"
            required
            onChange={(e) => {
              setItem((prev) => ({ ...prev, sellable: Boolean(e.target.value) }));
            }}
          >
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
      <input type="submit" value="Add Item" className="form-button" />
      <button
        className="back-button form-button"
        onClick={() => {
          setShowNewItemForm(false);
        }}
      >
        Back to list
      </button>
    </form>
  );
};
