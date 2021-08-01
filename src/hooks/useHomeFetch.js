// custom hook begins with "use"
import { useState, useEffect, useRef } from "react";
// API
import API from "../API";

const initialState = {
	page: 0,
	results: [],
	total_pages: 0,
	total_results: 0,
};

export const useHomeFetch = () => {
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchMovies = async (page, searchTerm = "") => {
		try {
			setError(false);
			setLoading(true);

			const movies = await API.fetchMovies(searchTerm, page);
			console.log(movies);

			// ...movies is spreading all the movies into an object here
			setState((prev) => ({
				...movies,
				results:
					page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
			}));
		} catch (error) {
			setError(true);
			console.log(error);
		}
		setLoading(false);
	};

	// Initial Render
	useEffect(() => {
		fetchMovies(1);
	}, []);

	return { state, loading, error };
};