import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../../../api/interfaces/user/User";
import { updateUser } from "../../../../api/apiBackendServices";
import { useAuth } from "../../../../context/AuthContext";
import { customjwtDecoder } from "../../../../api/CustomJwtDecoder";
import { useAxiosPrivate } from "../../../../hooks/useAxiosPrivate";

interface Props {
  setShowExistingItemForm: Dispatch<SetStateAction<boolean>>
}

export const AddExistingItemForm = ({setShowExistingItemForm}: Props) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };
  return (
      <form className="default-form-container" onSubmit={handleSubmit}>
        <button className="back-button form-button" onClick={() => {setShowExistingItemForm(false)}}>
          Back to list
        </button>
      </form>
  );
};
