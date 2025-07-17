import React from "react";
import { useState } from "react";
import Search from "./Component/search";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div className="flex max-w-3xl mx-auto text-left  gap-3 items-end justify-between bg-[#0F0D23] rounded-md p-2 shadow-md">
        <img src="./search.png" alt="" className="w-7 h-7 mx-auto" />
        <input className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-800"
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
