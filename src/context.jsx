import React, { useContext, useMemo, useState } from "react";
import { useCatApi } from "./services/catApi";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [selectedBreedId, setSelectedBreedId] = useState("");
  const [page, setPage] = useState(0);

  const { breeds, images, isLoadingBreeds, isLoadingImages, error } = useCatApi({
    selectedBreedId,
    limit: 6,
    page,
  });

  // kai pasirenka new breed – resetinam page i 0 (kad pakeistu galerija)
  const onSelectBreed = (breedId) => {
    setSelectedBreedId(breedId);
    setPage(0);
  };

  const loadMore = () => {
    setPage((p) => p + 1);
  };

  const value = useMemo(
    () => ({
      breeds,
      images,
      isLoadingBreeds,
      isLoadingImages,
      error,
      selectedBreedId,
      onSelectBreed,
      loadMore,
    }),
    [breeds, images, isLoadingBreeds, isLoadingImages, error, selectedBreedId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => useContext(AppContext);
