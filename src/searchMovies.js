import React, {useState} from "react";
import MovieCard from './movieCard';

export default function SearchMovies(props){

    // Initial value is empty string, then assign state (index 0 of the return array) to query
    const [query, setQuery] = useState('');

    const [movies, setMovies] = useState([]);
    
    const searchMovies = async (e) => {
        e.preventDefault();
        console.log("submitting...");
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=8f43d88f9d564c30bfae7a92440b8fa5&language=en-US&query=${query}&page=1&include_adult=false`;

        try { 
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.results);
            setMovies(data.results);
        } catch(err){
            console.error(err)
        }
    }
    
    return (
       
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit" disabled={!query}>Search</button>
            </form>
            <div className="card-list">
                {/* filter by movies that only have a poster, and then loop over those */}
                {movies.filter(movie => movie.poster_path).map(movie => 
                    // pass in movie prop into MovieCard component
                    <MovieCard movie={movie} key={movie.id} />
                    )}
            </div>
        </>
    )
}