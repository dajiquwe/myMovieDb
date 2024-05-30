import React from 'react';
import PropTypes from 'prop-types';
import "./Search.css";


const Search = ({ searchWord, changeSearchWord, mode }) => {
    const content =
        mode === 'Search' ? (
            <input
                className='search'
                type='input'
                placeholder='Type to search...'
                value={searchWord}
                onChange={(e) => changeSearchWord(e.target.value)}
            />
        ) : null;
    return content;
};

Search.propTypes = {
    searchWord: PropTypes.string.isRequired,
    changeSearchWord: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
};

export default Search;
