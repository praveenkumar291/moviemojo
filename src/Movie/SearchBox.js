import React from "react";
const SearchBox = (props) => {
  return (
    <div className="pool">
      <input
        className="form-controle"
        value={props.values}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="search here"
      ></input>
    </div>
  );
};
export default SearchBox;
