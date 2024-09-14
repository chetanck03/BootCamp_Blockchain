import { createContext } from "react";

// Creating a context named Web3Context using React's createContext function.
// This context will be used to share Web3-related state (like accounts, contracts, etc.) across components without prop drilling.
export const Web3Context = createContext(); 
