import { useGlobalContext } from "../../context";

const BreedSelector = () => {
  const { breeds, isLoadingBreeds, error, selectedBreedId, onSelectBreed } =
    useGlobalContext();

  if (isLoadingBreeds) return <p className="loading">Kraunamos veislės...</p>;
  if (error.show) return <p className="error">{error.msg}</p>;

  return (
    <div className="breed-selector">
      <label htmlFor="breed">Pasirink veislę:</label>
      <select
        id="breed"
        value={selectedBreedId}
        onChange={(e) => onSelectBreed(e.target.value)}
      >
        <option value="">-- Pasirink --</option>
        {breeds.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedSelector;