import { createContext, useEffect, useState } from "react";
import {
  getSavedItems,
  saveItem as saveItemApi,
  removeSavedItem as removeSavedItemApi,
} from "../utils/api.js";
import { useAuth } from "./useAuth.js";

const SavedItemsContext = createContext();

export const SavedItemsProvider = ({ children }) => {
  const { currentUser, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [savedItems, setSavedItems] = useState([]);
  const [loadedForUserId, setLoadedForUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentUserId = currentUser?._id;

  const visibleSavedItems =
    isAuthenticated && loadedForUserId === currentUserId ? savedItems : [];

  useEffect(() => {
    if (isAuthLoading || !currentUserId) return;

    let isCurrent = true;

    const fetchSavedItems = async () => {
      setIsLoading(true);

      try {
        const data = await getSavedItems();

        if (isCurrent) {
          setSavedItems(data);
          setLoadedForUserId(currentUserId);
        }
      } catch (error) {
        if (isCurrent) {
          console.error("Unable to load saved items:", error);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    fetchSavedItems();

    return () => {
      isCurrent = false;
    };
  }, [currentUserId, isAuthLoading]);

  const saveItem = async (itemId, itemType) => {
    const savedItem = await saveItemApi(itemId, itemType);

    setSavedItems((currentItems) => [...currentItems, savedItem]);

    return savedItem;
  };

  const removeSavedItem = async (savedItemId) => {
    await removeSavedItemApi(savedItemId);

    setSavedItems((currentItems) =>
      currentItems.filter((item) => item._id !== savedItemId)
    );
  };

  const isItemSaved = (itemId, itemType) => {
    return visibleSavedItems.some(
      (item) => item.itemId === String(itemId) && item.itemType === itemType
    );
  };

  const getSavedItemId = (itemId, itemType) => {
    const savedItem = visibleSavedItems.find(
      (item) => item.itemId === String(itemId) && item.itemType === itemType
    );

    return savedItem?._id;
  };

  return (
    <SavedItemsContext.Provider
      value={{
        savedItems: visibleSavedItems,
        isLoading,
        saveItem,
        removeSavedItem,
        isItemSaved,
        getSavedItemId,
      }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
};

export default SavedItemsContext;
