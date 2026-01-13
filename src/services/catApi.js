//uzkrauna breeds
//uzkrauna foto pagal breed (/images/search?breed_ids=...)

import { useEffect, useState } from "react";

const API_BASE = "https://api.thecatapi.com/v1";
const API_KEY = import.meta.env.VITE_CAT_API_KEY;

const headers = {
  "x-api-key": API_KEY,
};

export const useCatApi = ({ selectedBreedId, limit = 6, page = 0 }) => {
  const [breeds, setBreeds] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoadingBreeds, setIsLoadingBreeds] = useState(true);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  //1) Fetch breeds (1 karta)
  useEffect(() => {
    const fetchBreeds = async () => {
      setIsLoadingBreeds(true);
      setError({ show: false, msg: "" });

      try {
        const res = await fetch(`${API_BASE}/breeds`, { headers });
        if (!res.ok) throw new Error("Nepavyko gauti veislių sąrašo.");
        const data = await res.json();
        setBreeds(data);
      } catch (err) {
        setError({ show: true, msg: err.message || "Įvyko klaida (breeds)." });
      } finally {
        setIsLoadingBreeds(false);
      }
    };

    fetchBreeds();
  }, []);

  //2) Fetch images kai pasikeicia breed arba page (load more)
  useEffect(() => {
    const fetchImages = async () => {
      if (!selectedBreedId) return;

      setIsLoadingImages(true);
      setError({ show: false, msg: "" });

      try {
        const url = `${API_BASE}/images/search?breed_ids=${selectedBreedId}&limit=${limit}&page=${page}&order=DESC`;
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error("Nepavyko gauti kačių nuotraukų.");
        const data = await res.json();

        //jei page=0 – pakeiciam visa galerija, jei page>0 – pridedam
        setImages((prev) => (page === 0 ? data : [...prev, ...data]));
      } catch (err) {
        setError({ show: true, msg: err.message || "Įvyko klaida (images)." });
      } finally {
        setIsLoadingImages(false);
      }
    };

    fetchImages();
  }, [selectedBreedId, limit, page]);

  return {
    breeds,
    images,
    isLoadingBreeds,
    isLoadingImages,
    error,
    setImages, //resetui
  };
};