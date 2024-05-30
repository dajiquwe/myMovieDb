import Request from './request';

class getData {
    
    static getMoviesByTitle = (title, rightPage = 1) => {
        const rightTitle =
            title === '' ? 'return' : title;
        return Request.getRequest(
            `https://api.themoviedb.org/3/search/movie?api_key=0ee2bd30de1ea93e24d6179ec03925fa&query=${rightTitle}&page=${rightPage}`,
        );
    };

    static getGuestToken = () =>
        Request.getRequest(
            'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=0ee2bd30de1ea93e24d6179ec03925fa',
        ).then(({ guest_session_id: token, expires_at: expDate }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('expDate', expDate);
        });

    static getGuestRateList = (rightPage) =>
        getData.returnRightToken().then((token) =>
            Request.getRequest(
                `https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=0ee2bd30de1ea93e24d6179ec03925fa&language=en-US&sort_by=created_at.asc&page=${rightPage}`,
            ),
        );

    static setRating = async (rateNum, movieId) =>
        getData.returnRightToken().then((token) =>
            Request.postRequest(
                `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=0ee2bd30de1ea93e24d6179ec03925fa&guest_session_id=${token}`,
                JSON.stringify({ value: rateNum }),
            ),
        );

    static returnRightToken = async () => {
        const expDate = new Date(localStorage.getItem('expDate'));
        const curDate = new Date();

        if (expDate <= curDate) {
            await getData.getGuestToken();
            return localStorage.getItem('token');
        }

        return localStorage.getItem('token');
    };

    static getGenres = () =>
        Request.getRequest(
            'https://api.themoviedb.org/3/genre/movie/list?api_key=0ee2bd30de1ea93e24d6179ec03925fa&language=en-US',
        ).then(({ genres }) => genres);
}

export default getData;