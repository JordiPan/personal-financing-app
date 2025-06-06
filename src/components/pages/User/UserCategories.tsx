import { useEffect, useState } from "react";
import "../../../css/user-pages.css";
import { NewCategoryForm } from "./form-components/NewCategoryForm";
import { getCategories } from "../../../api/apiBackendServices";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { Category } from "../../../api/interfaces/category/Category";
import { CategoryComponent } from "./sub-components/CategoryComponent";
import Loading from "../../Loading";
//TODO: When add category form appears people can still use tab and enter to break sequence
//make a focus trap later to remove that possibility
function UserCategories() {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    document.title = "Cats";

    getCategories(axiosPrivate)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Categories | Find all your purchased items by category!</h1>
      <button
        className="create-category-button form-button container-color-dark"
        onClick={() => {
          setShowForm(true);
        }}
      >
        +
      </button>
      <hr />
      <div className="categories-list-container">
        <div className="categories-list buttons-list">
          <Loading isLoading={isLoading}>
            {categories.length !== 0 ? (
              <>
                {categories.map((category) => (
                  <CategoryComponent
                    key={category.id}
                    categoryId={category.id}
                    name={category.name}
                    description={category.description}
                  />
                ))}
              </>
            ) : (
              <> No custom categories found...</>
            )}
          </Loading>
        </div>
      </div>
      {showForm ? (
        <NewCategoryForm
          setCategories={setCategories}
          setShowForm={setShowForm}
          axiosPrivate={axiosPrivate}
        />
      ) : (
        <></>
      )}
    </>
  );
}
export default UserCategories;
