import React, { useState } from "react";

const Search = props => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form onSubmit={callSearchFunction}>
      <input
        onChange={handleSearchInputChanges}
        value={searchValue}
        type="text"
        className="search-input"
        placeholder="Search"
      />
    </form>
  );
};

export default Search;
