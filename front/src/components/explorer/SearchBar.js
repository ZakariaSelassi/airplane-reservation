import React from 'react'

const SearchBar = ({
  handleSearch,
}) => {

  return (
    <div className='searchbar'>
       <input type="text" placeholder="Search.." onChange={handleSearch}></input>
     </div>
  )
}

export default SearchBar