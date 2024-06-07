"use client";

import {
  setCurrentParty,
  selectCurrentParty,
} from "@/lib/features/negotiation/negotiationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import PartyA from '../partyA/PartyA';
import PartyB from '../partyB/PartyB';

export const Negotiations = () => {
  const dispatch = useAppDispatch();
  const currentParty = useAppSelector(selectCurrentParty);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(setCurrentParty("A"))}
        >
          Party A
        </button>

        <h1 className="px-1">Now you are on Party {currentParty}</h1>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(setCurrentParty("B"))}
        >
          Party B
        </button>
      </div>

      <div className="min-w-full my-10 p-10 border-solid border-2 border-slate-300 rounded-md">
        {currentParty === "A" ? <PartyA /> : <PartyB />}
      </div>
    </main>
  );
};
