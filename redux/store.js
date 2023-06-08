import { configureStore } from "@reduxjs/toolkit";
import subStatereducer from "./features/subSlice";
import { useSelector } from "react-redux";
export const store = configureStore({
	reducer: { subStatereducer },
});

export const useAppSelector = useSelector;
