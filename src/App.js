import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styles
import { GlobalStyle } from "./globalstyle";

// Components
import Header from "./components/Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Movie from "./components/Movie";

const App = () => (
	<Router>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/not-found/" element={<NotFound />} />
			<Route path="/:movieId/" element={<Movie />} />
		</Routes>
		<GlobalStyle />
	</Router>
);

export default App;
