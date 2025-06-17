import { useEffect } from "react";

function UserItems() {
  useEffect(() => {
    document.title = "Items";
  });
  return (
    <div className="crud-list-container">
      <div className="options-container">
        <button type="button" className="option-button active">
          Items
        </button>
        <button type="button" className="option-button">
          Transactions
        </button>
      </div>
      <div className="container-color-dark table-list">
        <p className="table-title">Items table</p>
        <div className="filter-container">
          <label id="filter">Filter:</label>
          <input type="text" id="filter" className="input"/>
        </div>
        <table className="filter-table">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Resellable</th>
            <th>Country of origin</th>
            <th>Category</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
export default UserItems;
