import { useEffect, useState } from "react";
import { FilterTableModule } from "./sub-components/FilterTableModule";

function UserItems() {
  const [chosenOption, setChosenOption] = useState("Items");

  useEffect(() => {
    document.title = "Filter tables";
  });

  const changeTable = (e: React.MouseEvent<HTMLButtonElement>) => {
    setChosenOption(e.currentTarget?.name);
  };
  return (
    <div className="crud-list-container">
      <div className="options-container">
        <button
          name="Items"
          type="button"
          className={`option-button ${chosenOption === "Items" && "active"}`}
          onClick={changeTable}
        >
          Items
        </button>
        <button
          name="Transactions"
          type="button"
          className={`option-button ${
            chosenOption === "Transactions" && "active"
          }`}
          onClick={changeTable}
        >
          Transactions
        </button>
      </div>
      <div className="container-color-dark table-list">
        <p className="table-title">{chosenOption} table</p>
        <div className="filter-container">
          <label id="filter">Filter:</label>
          <input type="text" id="filter" className="input" />
        </div>
        <FilterTableModule option={chosenOption} />
      </div>
    </div>
  );
}
export default UserItems;
