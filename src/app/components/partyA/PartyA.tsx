"use client";

import { useEffect, useState } from "react";
import {
  submitSettlement,
  selectStatusA,
  selectSettlementAmount,
  selectIsSubmittedA,
  selectHasUpdatesFromB,
  syncUpdatesFromB,
  selectProposedAmountB,
  selectIsAgreed,
} from "@/lib/features/negotiation/negotiationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Settled from '../settled/Settled';

export default function PartyA() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatusA);
  const storedAmount = useAppSelector(selectSettlementAmount);
  const isSubmitted = useAppSelector(selectIsSubmittedA);
  const hasUpdates = useAppSelector(selectHasUpdatesFromB);
  const proposedAmountB = useAppSelector(selectProposedAmountB);
  const isAgreed = useAppSelector(selectIsAgreed);

  const [settlementAmount, setSettlementAmount] = useState(0);
  const [needRefresh, setNeedRefresh] = useState(false);
  const isStoreSynced = !hasUpdates && !!proposedAmountB && storedAmount === proposedAmountB;

  function handleSubmitClick() {
    if (hasUpdates) {
      setNeedRefresh(true);
    } else {
      dispatch(submitSettlement(settlementAmount));
    }
  }

  function handleRefreshClick() {
    dispatch(syncUpdatesFromB());
    setNeedRefresh(false);
  }

  useEffect(() => {
    setSettlementAmount(storedAmount);
  }, [storedAmount])

  console.log(storedAmount, proposedAmountB, isAgreed)

  if(isStoreSynced && isAgreed) {
    return <Settled />;
  }

  return (
    <>
      {isStoreSynced && <h2 className="mb-2 text-green-500">Party B disputed and proposed {storedAmount}</h2>}

      <input
        type="number"
        aria-label="Settlement amount"
        className="mb-3 mr-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md sm:text-sm focus:ring-1"
        placeholder="Settlement amount"
        value={settlementAmount}
        min={0}
        onChange={(e) => setSettlementAmount(+e.target.value)}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:hover:bg-blue-500"
        onClick={handleSubmitClick}
        disabled={status === "loading"}
      >
        {isSubmitted ? "Resubmit" : "Submit"}
      </button>

      {needRefresh && (
        <>
          <button
            className="rounded-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-3 mr-2"
            onClick={handleRefreshClick}
          >
            Refresh
          </button>
          <p className="text-green-500">Please, check updates</p>
        </>
      )}

      {/* + there should be API error messages */}
    </>
  );
};
