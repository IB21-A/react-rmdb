import React, { useState, useEffect, useRef } from "react";

// input field controlled by react using the useState
// Use useEffect to trigger when this local state changes & update search term
// useRef to show you a trick we can use if we dont want to do something in useEffect on the *initial* render

// Image
import searchIcon from "../../images/search-icon.svg";
// Styles
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
	const [state, setState] = useState(""); // Create a state and a setter. Set an initial value of nothing since a search bar will be blank

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

export default SearchBar;
