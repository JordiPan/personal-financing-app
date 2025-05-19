import { useNavigate } from "react-router-dom";
import { slugify } from "../../../../services/slugify";
interface Props {
  categoryId: number;
  name: string;
  description: string;
}
export const CategoryComponent = ({categoryId, name, description }: Props) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`${slugify(name)}-${categoryId}`);
  }
  return (
    <button className="category container-color-dark form-button" onClick={handleClick}>
      {name}
      <hr />
      {description}
    </button>
  );
};
