import { useState } from "react";
import { createCategory } from "../../../../api/apiBackendServices";
import { AxiosInstance } from "axios";

interface Props {
  name: string;
  description: string;
}
export const CategoryComponent = ({ name, description }: Props) => {
  console.log(name, description);
  return (
    <button className="category container-color-dark form-button">
      {name}
      <hr />
      {description}
    </button>
  );
};
