import React, { useEffect, useState, Fragment } from 'react';

import { withRouter } from 'react-router-dom'

const Search = ({  history }) => {

    // object containing possible params to include in url query string to use in filter
    const[params, setParams] = useState({
        limit: 50,
        location: '',
        term: 'restaurant',
    });

    // update param data for location
    const handleLocationChange = e => {
        setParams({ ...params, location: e.target.value });
    }

    // update param data for select element (term)
    const handleSelectChange = e => {
        setParams({ ...params, term: e.target.value });
    }

    // when search is clicked, we build the link string and navigate to the search filters page
    const handleSearch = () => {
        const link = `/search?location=${params.location}&term=${params.term}`;
        history.push(link);
    }

    return (
        <div className='search__container'>
            <div className='search__slide'>
                <div className="search__form">
                    <div className="search__input--group">
                        <label className="input__label" htmlFor='input-text-address'>Your Location:</label>
                        <input 
                            type='text'
                            className='input__text'
                            id='input-text-address'
                            placeholder='Address, City, Zip Code'
                            value={params.location && params.location}
                            onChange={handleLocationChange}
                        />
                    </div>
                    <div className="search__input--group">
                        <label className="input__label" htmlFor='input-select-type'>Find:</label>
                        <select
                            className='input__select'
                            id='input-select-type'
                            onChange={handleSelectChange}
                        >
                            <option value='restaurant'>Restaurants</option>
                            <option value='events'>Events</option>
                        </select>
                    </div>
                </div>
                <div className="search__buttons">
                    <button className="btn btn__primary btn__primary--big center-elem" onClick={handleSearch}><i className="fas fa-search"></i> Search</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Search);