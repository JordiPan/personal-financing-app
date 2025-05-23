import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}
export const TransactionOverview = ({ step, setStep } : Props) => {
  console.log(step, setStep);
  useEffect(() => {});
  return (
    <>
      <h1>Step {step} | Confirm this shiz</h1>
      
    </>
  );
};
