import { useContext } from "react";
import SavedItemsContext from "./SavedItemsContext.jsx";

export const useSavedItems = () => useContext(SavedItemsContext);
