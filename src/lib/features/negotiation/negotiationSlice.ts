import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchSubmit, fetchAgree, fetchDispute } from "./negotiationAPI";

export interface NegotiationSliceState {
  settlementAmount: number;
  isSubmittedA: boolean;
  isSubmittedB: boolean;
  isAgreed: boolean;
  proposedAmountB: number;
  hasUpdatesFromB: boolean;
  currentParty: "A" | "B";
  statusA: "loading" | "idle" | "failed";
  statusB: "loading" | "idle" | "failed";
}

const initialState: NegotiationSliceState = {
  settlementAmount: 0,
  isSubmittedA: false,
  isSubmittedB: false,
  isAgreed: false,
  proposedAmountB: 0,
  hasUpdatesFromB: false,
  currentParty: "A",
  statusA: "idle",
  statusB: "idle",
};

export const negotiationSlice = createAppSlice({
  name: "negotiation",
  initialState,
  reducers: (create) => ({
    setCurrentParty: create.reducer(
      (state, action: PayloadAction<"A" | "B">) => {
        state.currentParty = action.payload;
      },
    ),
    syncUpdatesFromB: create.reducer((state) => {
      state.settlementAmount = state.proposedAmountB;
      state.hasUpdatesFromB = false;
    }),
    submitSettlement: create.asyncThunk(
      async (amount: number) => {
        const response = await fetchSubmit(amount);
        return response.data;
      },
      {
        pending: (state) => {
          state.statusA = "loading";
        },
        fulfilled: (state, action) => {
          state.statusA = "idle";
          state.settlementAmount = action.payload;
          state.isSubmittedA = true;
          state.isSubmittedB = false;
        },
        rejected: (state) => {
          state.statusA = "failed";
        },
      },
    ),
    agreeSettlement: create.asyncThunk(
      async (amount: number) => {
        const response = await fetchAgree(amount);
        return response.data;
      },
      {
        pending: (state) => {
          state.statusB = "loading";
        },
        fulfilled: (state, action) => {
          state.statusB = "idle";
          state.isAgreed = true;
          state.hasUpdatesFromB = true;
          state.proposedAmountB = action.payload;
        },
        rejected: (state) => {
          state.statusB = "failed";
        },
      },
    ),
    submitDispute: create.asyncThunk(
      async (amount: number) => {
        const response = await fetchDispute(amount);
        return response.data;
      },
      {
        pending: (state) => {
          state.statusB = "loading";
        },
        fulfilled: (state, action) => {
          state.statusB = "idle";
          state.proposedAmountB = action.payload;
          state.hasUpdatesFromB = true;
          state.isSubmittedB = true;
        },
        rejected: (state) => {
          state.statusB = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectCurrentParty: (store) => store.currentParty,
    selectStatusA: (store) => store.statusA,
    selectStatusB: (store) => store.statusB,
    selectSettlementAmount: (store) => store.settlementAmount,
    selectIsSubmittedA: (store) => store.isSubmittedA,
    selectIsSubmittedB: (store) => store.isSubmittedB,
    selectIsAgreed: (store) => store.isAgreed,
    selectHasUpdatesFromB: (store) => store.hasUpdatesFromB,
    selectProposedAmountB: (store) => store.proposedAmountB,
  },
});

export const {
  setCurrentParty,
  submitSettlement,
  agreeSettlement,
  submitDispute,
  syncUpdatesFromB,
} = negotiationSlice.actions;

export const {
  selectCurrentParty,
  selectStatusA,
  selectStatusB,
  selectSettlementAmount,
  selectIsSubmittedA,
  selectIsSubmittedB,
  selectIsAgreed,
  selectHasUpdatesFromB,
  selectProposedAmountB,
} = negotiationSlice.selectors;
