import React, { Component } from "react";
import { debounce } from "lodash";
import Tabs from "../onTab/Tabs";
import Search from "../search/Search";
import MovieList from "../movieList/MovieList";
import { ContextProvider } from "../ProvideContext/ContextProvider";
import getData from "../../services/getData";
import "./App.css";


class App extends Component {
  state = {
    movieList: [],
    page: 1,
    totalResults: null,
    mode: "Search",
    searchWord: "",
    loaded: true,
    onFail: false,
    tabs: [
      {
        id: 1,
        label: "Search",
        area: "Select search",
      },
      {
        id: 2,
        label: "Rated",
        area: "Select rated",
      },
    ],
  };

  updateMovies = debounce((searchWord, searchPage) => {
    getData.getMoviesByTitle(searchWord, searchPage)
      .then(({ results, total_results: totalResults, page }) => {
        if (totalResults > 0) {
          this.setState({
            movieList: results,
            totalResults,
            page,
            loaded: false,
          });
        }
        if (totalResults === 0) {
          alert('no Data');
          this.setState({
            movieList: [],
            loaded: false,
          })
        }
      })
      .catch((error) => {
        this.setState({
          onFail: error,
          loaded: false,
        });
      });
  }, 500);

  componentDidMount() {
    getData.returnRightToken();
    this.updateMovies("return", 1);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchWord, page, mode } = this.state;

    if (
      (prevState.searchWord !== searchWord && searchWord) ||
      prevState.page !== page ||
      prevState.mode !== mode
    ) {
      if (mode === "Search") {
        this.updateMovies(searchWord, page);
      } else {
        this.getGuestRateList(page);
      }
    }
  }

  getGuestRateList = (ratePage) => {
    setTimeout(() => {
      getData.getGuestRateList(ratePage)
        .then(({ results, page, total_results: totalResults }) => {
          this.setState({
            movieList: results,
            page,
            loaded: false,
            totalResults,
          });
        })
        .catch((error) => {
          this.setState({
            onFail: error,
            loaded: false,
          });
        });
    }, 1000);
  };

  setRating = (rating, id) => {
    getData.setRating(rating, id).then(({ success }) => {
      if (success) {
        const curStarsList = JSON.parse(localStorage.getItem("starsList"));

        if (curStarsList !== null) {
          const newStarsList = [...curStarsList];
          const doubleIdx = curStarsList.findIndex(
            ({ id: innerId }) => id === innerId
          );

          if (doubleIdx !== -1) {
            newStarsList[doubleIdx] = { id, rating };
          } else {
            newStarsList.push({ id, rating });
          }

          localStorage.setItem("starsList", JSON.stringify(newStarsList));
        } else {
          localStorage.setItem("starsList", JSON.stringify([{ id, rating }]));
        }
      }
    });
  };

  changeMode = (mode) => {
    this.setState({
      mode,
      loaded: true,
      page: 1,
    });
  };

  changeSearchWord = (searchWord) => {
    if (searchWord !== "") {
      this.setState({
        loaded: true,
      });
    }

    this.setState({
      searchWord,
      page: 1,
    });
  };

  changePage = (page) => {
    this.setState({
      page,
      loaded: true,
    });
  };

  render() {
    const {
      movieList,
      loaded,
      onFail,
      searchWord,
      page,
      totalResults,
      tabs,
      mode,
    } = this.state;

    return (
      <ContextProvider>
        <div className="app">
          <Tabs
            tabs={tabs}
            mode={mode}
            changeMode={this.changeMode}
          />
          <Search
            searchWord={searchWord}
            changeSearchWord={this.changeSearchWord}
            mode={mode}
          />
          <MovieList
            movieList={movieList}
            page={page}
            totalResults={totalResults}
            changePage={this.changePage}
            loaded={loaded}
            onFail={onFail}
            mode={mode}
            setRating={this.setRating}
          />
        </div>
      </ContextProvider>
    );
  }
}

export default App;
