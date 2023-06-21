"use client";
import { store } from "./store";
import { Provider as ProviderDiv } from "react-redux";
import React from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ProviderDiv store={store}>{children}</ProviderDiv>;
}
