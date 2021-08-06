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
	const [searchTerm, setSearchTerm] = useState("");
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	console.log(searchTerm);

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

	// Initial render and search
	useEffect(() => {
		setState(initialState); // clearing out any previously retrieved list of movies so we can get a new one
		fetchMovies(1, searchTerm);
	}, [searchTerm]);

	// Load More
	useEffect(() => {
		if (!isLoadingMore) return;

		fetchMovies(state.page + 1, searchTerm);
		setIsLoadingMore(false);
	}, [isLoadingMore, searchTerm, state.page]);

	return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
};
