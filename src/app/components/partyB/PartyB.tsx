"use client";

import { useState } from "react";
import {
  submitDispute,
  selectStatusB,
  selectIsSubmittedB,
  selectSettlementAmount,
  agreeSettlement,
  selectProposedAmountB,
  selectIsAgreed,
} from "@/lib/features/negotiation/negotiationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Settled from '../settled/Settled';

export default function PartyB() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatusB);
  const storedAmount = useAppSelector(selectSettlementAmount);
  const isSubmitted = useAppSelector(selectIsSubmittedB)
  const proposedAmountB = useAppSelector(selectProposedAmountB);
  const isAgreed = useAppSelector(selectIsAgreed);

  const amountToShow = isSubmitted ? proposedAmountB : storedAmount;

  const [settlementAmount, setSettlementAmount] = useState(amountToShow);

  if (isAgreed) {
    return <Settled />;
  }

  return (
    <>
      {!isSubmitted && <h2 className="mb-2 text-green-500">Party A proposed {storedAmount}</h2>}
      <input
        type="number"
        aria-label="Proposed amount"
        className="mb-3 mr-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md sm:text-sm focus:ring-1"
        placeholder="Proposed amount"
        value={settlementAmount}
        min={0}
        onChange={(e) => setSettlementAmount(+e.target.value)}
        disabled={isSubmitted}
      />
      <div className="inline-block">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3 disabled:opacity-50 disabled:hover:bg-blue-500"
          onClick={() => dispatch(agreeSettlement(storedAmount))}
          disabled={status === "loading" || isSubmitted}
        >
          Agree
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:hover:bg-red-500"
          onClick={() => dispatch(submitDispute(settlementAmount))}
          disabled={status === "loading" || isSubmitted}
        >
          Dispute
        </button>

        {/* + there should be API error messages */}
      </div>
    </>
  );
};
