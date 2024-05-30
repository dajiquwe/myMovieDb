/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { ContextConsumer } from '../ProvideContext/ContextProvider';
import "./Genres.css";


const getGenreTitle = (genreList, genresListPattern) => {
    const result = [];
    genreList.forEach((genId) => {
        genresListPattern.forEach(
            ({ id, name }) => id === genId && result.push(name),
        );
    });

    return result.slice(0, 3);
};

const Genre = ({ genreList, id }) => (
    <ContextConsumer>
        {({ genresListPattern, onFailGenres }) => {
            const finallGenreList = getGenreTitle(genreList, genresListPattern);

            if (onFailGenres) {
                return null;
            }

            return (
                <div className='genre'>
                    {finallGenreList.map((genre) => (
                        <p key={`${id}-${genre}`} className='genre__text'>
                            {genre}
                        </p>
                    ))}
                </div>
            );
        }}
    </ContextConsumer>
);

Genre.propTypes = {
    genreList: PropTypes.arrayOf(PropTypes.number).isRequired,
    id: PropTypes.number.isRequired,
};

export default Genre;
