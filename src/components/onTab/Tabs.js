import React from 'react';
import PropTypes from 'prop-types';
import "./Tabs.css";


const Tabs = ({ tabs, mode, changeMode }) => (
    <header className='tabs'>
        {tabs.map(({ id, label, area }) => (
            <button
                key={id}
                className={
                    mode === label
                        ? 'tabs__btn tabs__btn_active'
                        : 'tabs__btn'
                }
                type='button'
                area-label={area}
                onClick={() => {
                    changeMode(label);
                }}
            >
                {label}
            </button>
        ))}

        <a href='#head' className='tabs-anchor'>
            ANCHOR
        </a>
    </header>
);

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
    mode: PropTypes.string,
    changeMode: PropTypes.func.isRequired,
};

Tabs.defaultProps = {
    mode: 'Search',
};

export default Tabs;
