import React from "react";
import { useParams } from "react-router-dom";

// config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
// components
import BreadCrumb from "./Breadcrumb";
import Grid from "./Grid";
import Spinner from "./Spinner";
import MovieInfo from "./MovieInfo";
import Actor from "./Actor";

// hook
import { useMovieFetch } from "../hooks/useMovieFetch";
//image
import NoImage from "../images/no_image.jpg";
import MovieInfoBar from "./MovieInfoBar";
import { assertTSConstructSignatureDeclaration } from "@babel/types";

const Movie = () => {
	const { movieId } = useParams(); // useParams will get the movieId from the react-router-dom Route path='/:movieId'
	// its named :movieId so we simply need to restructure it as such. If it was named something different we'd have
	// match that name & rename it like { id:movieId}

	// state:movie renaming state as movie
	const { state: movie, loading, error } = useMovieFetch(movieId);
	console.log(movie);

	if (loading) return <Spinner />;
	if (error) return <div>Something went wrong...</div>;

	return (
		<>
			<BreadCrumb movieTitle={movie.original_title} />
			<MovieInfo movie={movie} />
			<MovieInfoBar
				time={movie.runtime}
				budget={movie.budget}
				revenue={movie.revenue}
			/>
			<Grid header="Actors">
				{movie.actors.map((actor) => (
					<Actor
						key={actor.credit_id}
						name={actor.name}
						character={actor.character}
						imageUrl={
							actor.profile_path
								? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
								: NoImage
						}
					/>
				))}
			</Grid>

			<div>{movie.title}</div>
		</>
	);
};

export default Movie;
