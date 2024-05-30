import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import { setRightDataFormat, getRateStatus, cutText } from '../../utils/utils';
import Genre from '../getGenre/Genres';
import CyrcleRate from '../currentRoundRate/RoundRate';
import "./MovieItem.css";


const MovieItem = ({
    poster_path: imgPath,
    title,
    genre_ids: genreList,
    overview,
    release_date: date,
    id,
    vote_average: vote,
    setRating,
}) => {
    const imgUrl =
        imgPath === null ? '/sH6030EbSzOUTFFZrpnTdSpeNP0.jpg' : imgPath;

    return (
        <div className='movie-item'>
            <picture>
                <source
                    media='(min-width: 1024px)'
                    srcSet={`https://image.tmdb.org/t/p/w1280${imgUrl}`}
                />
                <img
                    className='movie-item__img'
                    srcSet={`https://image.tmdb.org/t/p/w300${imgUrl}`}
                    alt='movie logo'
                    width='183'
                    height='292'
                />
            </picture>
            <div className='movie-item__info'>
                <h2 className='movie-item__title'>{title}</h2>
                <p className='movie-item__data'>{setRightDataFormat(date)}</p>
                <Genre genreList={genreList} id={id} />
            </div>
            <p className='movie-item__overview'>
                {cutText(overview)}
            </p>
            <Rate
                allowClear={false}
                allowHalf
                defaultValue={getRateStatus(id)}
                className='movie-item__rate'
                count={10}
                onChange={(num) => {
                    setRating(num, id);
                }}
            />
            <CyrcleRate vote={vote} />
        </div>
    );
};

MovieItem.propTypes = {
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    id: PropTypes.number.isRequired,
    vote_average: PropTypes.number,
    setRating: PropTypes.func.isRequired,
};

MovieItem.defaultProps = {
    poster_path: null,
    release_date: '',
    vote_average: 0,
};

export default MovieItem;
