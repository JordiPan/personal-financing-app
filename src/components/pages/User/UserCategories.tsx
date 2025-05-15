import { useEffect } from "react";
import "../../../css/user-pages.css";
function UserCategories() {
  useEffect(() => {
    document.title = "Cats";
  });
  return (
    <div className="user-container">
      <h1>Categories</h1>
      <hr />
      <div className="categories-list-container">
        <div className="categories-list">
          <button className="category container-color-dark">Category | description</button>
          <button className="category container-color-dark">Category | description</button>
          <button className="category container-color-dark">Category | description</button>
          <button className="category container-color-dark">Category | description</button>
          <button className="category container-color-dark">Category | description</button>
        </div>
        <button className="create-category-button form-button container-color-dark">+</button>
      </div>
    </div>
  );
}
export default UserCategories;
