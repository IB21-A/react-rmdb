import { useState, useEffect } from "react";
import API from "../API";
import { isPersistedState } from "../helpers";

export const useMovieFetch = (movieId) => {
	const [state, setState] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				setLoading(true);
				setError(false);
				const movie = await API.fetchMovie(movieId);
				const credits = await API.fetchCredits(movieId);
				// Get Directors only
				const directors = credits.crew.filter(
					(member) => member.job === "Director"
				);

				setState({
					...movie,
					actors: credits.cast,
					directors,
				});
				setLoading(false);
			} catch (error) {
				setError(true);
			}
		};
		// Load from session storage
		const sessionState = isPersistedState(movieId);

		if (sessionState) {
			setState(sessionState);
			setLoading(false);
			return;
		}

		// calling the async function that we wrote above for this hook if no session storage
		fetchMovie();
	}, [movieId]);

	// Write to session storage
	useEffect(() => {
		sessionStorage.setItem(movieId, JSON.stringify(state));
	}, [movieId, state]);

	return { state, loading, error };
};
