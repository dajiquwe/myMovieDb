import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getData from '../../services/getData';

const { Provider, Consumer } = React.createContext();

class ContextProvider extends Component {
    state = {
        genresListPattern: [],
        onFailGenres: false,
    };

    componentDidMount() {
        this.getGenres();
    }

    getGenres = () => {
        getData.getGenres()
            .then((genresListPattern) => this.setState({ genresListPattern }))
            .catch((error) => this.setState({ onFailGenres: error }));
    };

    render() {
        const {
            genresListPattern,
            onFailGenres,
        } = this.state;
        const { children } = this.props;

        return (
            <Provider
                value={{
                    genresListPattern,
                    onFailGenres,
                }}
            >
                {children}
            </Provider>
        );
    }
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ContextProvider, Consumer as ContextConsumer };
