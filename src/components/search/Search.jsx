import {useGlobalContext} from "../../context.jsx";
//context hook-gives access to global data stored in AppProvider

//input > state > API > UI
const Search = () => {
    //take 3values from context> query(currentSearch), setQuery(func to update query), API err info
    //query here is the same state defined in context.jsx
    const {query, setQuery, error} = useGlobalContext();
    //input controlled by React,value comes from React state, query change>input txt change
    //onChange={(e) => setQuery(e.target.value)}:
    //USER TYPES >onCHANGE >BRWSER SEND EVENT >e.targer.value=inputTxt >setQuery(NEWTXT) UPDATE GLOBAL STATE >CONTEXT STATE change >getMOVIE RUNS again >API FETCH >MOVIES updated >RE-RENDER Movies.jsx
    //API is called on every keystroke - b-ba-bat-batm-batma-batman - 6 API CALLS

    //Search.jsx updates the global query state using setQuery on every input change, which automatically triggers a new API fetch through context and re-renders the movie list.
    return(
        <form  className="search-form">
            <h2>Search movies</h2>
            <input
                type="text"
                className="form-input"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />
            {error.show && <div className="error">{error.msg}</div>}
        </form>
    )
}

export default Search;

//after query updates > context.jsx RE-RENDERS const { data: movies } = getMovie(`&s=${query}`);
//query changes > getMovie("&s=bat") - runs again
//getMovie useEffect runs:
//.. useEffect(() => {fetchMovies(`${API_ENDPOINT}${urlParams}`);}, [urlParams]);
//.. urlParams changed, API is called again, new movies fetched > movies state updates, Movies.jsx RE-RENDERS, new movie list opens