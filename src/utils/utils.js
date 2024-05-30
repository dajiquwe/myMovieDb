import { format } from 'date-fns';

const cutText = (txt) => {
    if(txt.length > 150 ){
      txt = txt.slice(0, 150);
      let last = txt.slice(-1);
      while (last !== ' ') {
        txt = txt.slice(0, -1);
        last = txt.slice(-1);
      }
      return txt + '...'
    }
    else return txt
}

const getRateStatus = (currentId) => {
    const starsList =
        JSON.parse(localStorage.getItem('starsList')) !== null
            ? JSON.parse(localStorage.getItem('starsList'))
            : [];
            
    let resultRate = 0;

    starsList.forEach(({ id, rating }) => {
        if (id === currentId) {
            resultRate = rating;
        }
    });

    return resultRate;
};

const setRightDataFormat = (date) => {
    if (date === '') {
        return 'Release date unknown';
    }
    return format(new Date(date), 'LLLL d, yyyy');
};

export { cutText, getRateStatus, setRightDataFormat };
