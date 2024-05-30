import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination, Spin } from 'antd';
import ErrorMessage from '../onError/ErrorMessage';
import MovieItem from '../movieItem/MovieItem';
import "./MovieList.css";


const getContent = ({
    movieList,
    starsList,
    totalResults,
    changePage,
    mode,
    page,
    setRating,
}) => {
    if (movieList === undefined) {
        alert('no rated movies yet')
    }
    else {
        if (movieList.length > 0) {
            const list = movieList.map((movie) => (
                <Col span={24} md={12} className='gutter-row' key={movie.id}>
                    <MovieItem {...movie} starsList={starsList} setRating={setRating} />
                </Col>
            ));
    
            return (
                <>
                    {list}
                    <Pagination
                        size='small'
                        total={totalResults}
                        current={page}
                        pageSize={20}
                        showSizeChanger={false}
                        onChange={(pageNum) => changePage(pageNum)}
                    />
                </>
            );
        }
    }

    if (mode === 'Search') {
        return (
            <p className='no-movies'>
                No movies were found for this search query
            </p>
        );
    }
    return <p className='no-movies'>No movies that you rated</p>;
};

const MovieList = (props) => {
    const { loaded, onFail } = props;

    if (loaded) {
        return <Spin tip='Loading...' size='large' />;
    }

    if (onFail) {
        return <ErrorMessage error={onFail} />;
    }

    return (
        <Row className='movie-list' gutter={[{ xs: 16, sm: 16, md: 36 }, 35]}>
            {getContent({ ...props })}
        </Row>
    );
};

MovieList.propTypes = {
    loaded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
    onFail: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default MovieList;
