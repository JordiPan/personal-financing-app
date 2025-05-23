import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}
export const TransactionItemsForm = ({ step, setStep } : Props) => {
  console.log(step, setStep);
  useEffect(() => {});
  return (
    <>
      <h1>Step {step} | Items bought in transaction</h1>
      
    </>
  );
};
