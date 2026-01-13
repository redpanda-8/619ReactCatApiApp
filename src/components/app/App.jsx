import BreedSelector from "../breedSelector/breedSelector";
import CatGallery from "../catGallery/catGallery";

function App() {
  return (
    <main className="container">
      <h1>Cat Breed Search</h1>
      <BreedSelector />
      <CatGallery />
    </main>
  );
}

export default App;