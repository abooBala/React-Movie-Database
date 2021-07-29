import { useState, useEffect } from "react";
// API
import API from '../API';

// Set an initial state to reset the app
const initialState = {
    page: 0, 
    results: [],
    total_pages: 0,
    total_results: 0 
}

export const useHomeFetch = () => {
    const [state, setState] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm, page);
            console.log(movies);

            setState(prev => ({
                // Create a new object. Never mutate a state, set the new value in the setter instead
                ...movies, 
                results:
                page > 1 ? [...prev.results, ...movies.results] : [...movies.results]

            }));

        } catch(error) {
            setError(true);
        }
        setLoading(false)
    } 

    // Initial render
    useEffect(() => {
        fetchMovies(1)
    }, []); 
    // [] is a dependency array for a useEffect. An empty array means it will only run once. 

    return { state, loading, error }
}