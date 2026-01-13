import { useGlobalContext } from "../../context";

const CatGallery = () => {
  const { images, isLoadingImages, error, selectedBreedId, loadMore } =
    useGlobalContext();

  if (!selectedBreedId) {
    return <p className="hint">Pasirink veislę, kad pamatytum nuotraukas 🐾</p>;
  }

  if (error.show) return <p className="error">{error.msg}</p>;

  return (
    <div className="gallery-wrap">
      {isLoadingImages && images.length === 0 && (
        <p className="loading">Kraunamos nuotraukos...</p>
      )}

      <div className="gallery">
        {images.map((img) => (
          <div className="card" key={img.id}>
            <img src={img.url} alt="cat" />
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={loadMore} disabled={isLoadingImages}>
          {isLoadingImages ? "Kraunama..." : "Rodyti daugiau"}
        </button>
      </div>
    </div>
  );
};

export default CatGallery;