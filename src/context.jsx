import React, { useContext, useMemo, useState } from "react";
import catApi from "./services/catApi";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [selectedBreedId, setSelectedBreedId] = useState("");
  const [page, setPage] = useState(0);

  const { breeds, images, isLoadingBreeds, isLoadingImages, error } = catApi({
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

  return <AppContext value={value}>{children}</AppContext>;
};

export const useGlobalContext = () => {
  return useContext(AppContext)}
export {AppContext, AppProvider};