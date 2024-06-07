'use client'
import { useRef } from "react"
import type { ReactNode } from "react";
import { Provider } from "react-redux"
import { makeStore, AppStore } from "@/lib/store"

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
