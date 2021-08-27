import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { withRouter, useLocation, Link } from 'react-router-dom'

import { getResultsByParams } from '../../redux/actions/results';

import ResultItem from './../../components/search/result-item';
import Spinner from './../../components/spinner/spinner';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchResult = ({ getResultsByParams, results: { results, loading }, history }) => {
    let query = useQuery();

    const[params, setParams] = useState({
        limit: 50,
        location: query.get("location"),
        term: query.get("term"),
    });

    useEffect(() => {
        if (query.get("categories")) params['categories'] = query.get("categories");
        if (query.get("prices")) params['prices'] = query.get("prices");
        console.log(params);
        async function getResults() {
            await getResultsByParams(params);
        }
        getResults();
    }, []);

    const[randomIndex, setRandomIndex] = useState(-1);

    useEffect(() => {
        createRandomIndex();
    }, [results]);

    const createRandomIndex = () => {
        const randomNum = Math.floor(Math.random() * (results.length-1));
        setRandomIndex(randomNum);
    }

    const[resultsLink, setResultsLink] = useState("");

    useEffect(() => {
        let link = `/results?location=${params.location}&term=${params.term}`;
        if (params.categories) link += `&categories=${params.categories}`;
        if (params.prices) link += `&prices=${params.prices}`;
        setResultsLink(link);
    }, [])

    const handleBack = () => {
        let link = `/search?location=${params.location}&term=${params.term}`;
        history.push(link);
    }

    return loading ? <Spinner /> : (
        <div className='search__container'>
            <div className='search__slide search__slide--3'>
                <Link className="search__link" to={resultsLink}>Full Results <i className="fas fa-arrow-right"></i></Link>
                <div className="search__results">
                    {
                        randomIndex >= 0 
                            ? <ResultItem results={results} result={results[randomIndex]} index={randomIndex} mode='single' />
                            : <div>No results</div>
                    }   
                </div>
                <div className="search__buttons">
                    <button className="btn btn__primary" onClick={handleBack}>Back</button>
                    <button className="btn btn__primary" onClick={createRandomIndex}>Randomize</button>
                </div>
            </div>
        </div>
    )
}

SearchResult.propTypes = {
    getResultsByParams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    results: state.results
})

export default connect(mapStateToProps, { getResultsByParams })(withRouter(SearchResult));