import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// input field controlled by react using the useState
// Use useEffect to trigger when this local state changes & update search term
// useRef to show you a trick we can use if we dont want to do something in useEffect on the *initial* render

// Image
import searchIcon from "../../images/search-icon.svg";
// Styles
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
	const [state, setState] = useState(""); // Create a state and a setter. Set an initial value of nothing since a search bar will be blank
	const initial = useRef(true); // this wont trigger a re-render, so it is directly mutable and doesnt need a setter

	// Use effect will always trigger when the component first mounts, so we'll use useRef
	// to ensure that when the component first mounts, it will not start sending searches until you begin to type
	useEffect(() => {
		if (initial.current) {
			initial.current = false; // We are mutating this directly bc its not a state. Changes to useRef won't trigger a rerender
			return;
		}
		// this is a timer that will help create a delay between typing a search term and the auto search beginning
		const timer = setTimeout(() => {
			// setSearchTerm is a state setter from useHomeFetch that we passed in to this component so it can
			// make changes to the searchTerm state
			setSearchTerm(state);
		}, 500);

		return () => clearTimeout(timer);
	}, [setSearchTerm, state]);

	return (
		<Wrapper>
			<Content>
				<img src={searchIcon} alt="search-icon" />
				<input
					type="text"
					placeholder="Search Movie"
					onChange={(event) => setState(event.currentTarget.value)}
					value={state}
					// e.currentTarget.value gives us the events' targets' value. In this case the event is the search bar's contents
					// So When the input changes, value will be passed to setState and the state (search term text) will be updated
				/>
			</Content>
		</Wrapper>
	);
};

SearchBar.propTypes = {
	callback: PropTypes.func,
};

export default SearchBar;
