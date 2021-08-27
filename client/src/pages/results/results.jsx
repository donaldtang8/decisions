import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { withRouter, useLocation } from 'react-router-dom';

import { getResultsByParams } from '../../redux/actions/results';
import { resetCategories, getCategories } from '../../redux/actions/categories';

import Result from './../../components/search/result';
import Spinner from './../../components/spinner/spinner';

import MapContainer from './../../components/maps/map-container';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Results = ({ getResultsByParams, resetCategories, getCategories, categories: { categories }, results, history }) => {
    let query = useQuery();

    const[params, setParams] = useState({
        limit: 50,
        location: query.get("location"),
        term: query.get("term"),
    });

    useEffect(() => {
        if (query.get("categories")) params['categories'] = query.get("categories");
        if (query.get("prices")) params['prices'] = query.get("prices");
        async function getResults() {
            await getResultsByParams(params);
        }
        getResults();
    }, []);

    const handleSortClick = e => {
        setParams({ ...params, sort_by: e.target.value });
    }

    const handleQuerySubmit = e => {
        e.preventDefault();
        getResultsByParams(params);
        delete params.sort_by;
        clearRadioButtons('sort');
    }

    const clearRadioButtons = (type) => {
        if (type === 'sort') {
            const sortButtons = document.getElementsByName('radio-sort');
            for (let button of sortButtons) {
                button.checked = false;
            }
        }
    }

    return results.loading ? <Spinner /> : (
        <div className="results__container">
            <div className="results__query">
                <div className="results__filters">
                </div>
                <div className="results__sort">
                    <div className="results__sort--title">Sort By:</div>
                    <div className="results__sort--items">
                        <div className="results__sort--item">
                            <input type="radio" id="radio-rating" name="radio-sort" value="rating" onClick={handleSortClick} />
                            <label for="radio-rating">Rating</label>
                        </div>
                        <div className="results__sort--item">
                            <input type="radio" id="radio-review-count" name="radio-sort" value="review_count" onClick={handleSortClick} />
                            <label for="radio-review-count">Review Count</label>
                        </div>
                        <div className="results__sort--item">
                            <input type="radio" id="radio-distance" name="radio-sort" value="distance" onClick={handleSortClick} />
                            <label for="radio-distance">Distance</label>
                        </div>
                    </div>
                </div>
                <button className="btn btn__primary btn__primary--small" onClick={handleQuerySubmit}>Apply</button>
            </div>
            <div className="results__wrapper">
                {
                    results.results.map((result, idx) => (
                        <Result key={idx} result={result} index={idx} />
                    ))
                }
            </div>
            <div className="results__map">
                <MapContainer results={results.results} mode='multiple' />
            </div>   
        </div>
        
    )
}

Results.propTypes = {
    getResultsByParams: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    results: state.results,
    categories: state.categories
})

export default connect(mapStateToProps, { getResultsByParams, resetCategories, getCategories })(withRouter(Results));