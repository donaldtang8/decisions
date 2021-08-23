import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom'

import { getResultsByParams } from '../../redux/actions/results';
import { resetCategories, getCategories } from '../../redux/actions/categories';

import ResultItem from './../../components/search/result-item';
import CategoryItem from './../../components/categories/category-item';
import Spinner from './../../components/spinner/spinner';

import { getCategoriesFromResults } from './../../utils/resultsOperations';

const Search = ({ getResultsByParams, resetCategories, getCategories, categories: { categories }, results: { results } }) => {
    // keeps track of which window we're at
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (step === 3) {
            let linkString = "";
            linkString += "location=" + params.location;
            linkString += "&term=" + params.term;
            if (params.categories) linkString += "&categories=" + params.categories.toString();
            if (params.price) linkString += "&price=" + params.price.toString();
            setResultsLink(linkString);
        }
    }, [step]);

    const handleSlideChange = async (slideIdx, direction) => {
        if (slideIdx === 1) {
            if (params.location.length > 0 && params.term.length > 0) {
                await getResultsByParams(params);
            }
        }
        if (slideIdx === 2) {
            if (direction === 'back') resetCategories();
            else {
                if (selectedCategories.length > 0) {
                    params['categories'] = selectedCategories.toString();
                }
                if (selectedPrices.length > 0) {
                    params['price'] = selectedPrices.toString();
                }
                await getResultsByParams(params);
            }
        }
        if (slideIdx >= 2) {
            // reset selectedCategories array
            setSelectedCategories([]);
            delete params.categories;
        }
        await setStep(direction === 'back' ? step - 1 : step + 1);
    }

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

    // retrieve categories from results
    useEffect(() => {
        if (step === 1) {
            const categoriesArr = getCategoriesFromResults(results);
            getCategories(categoriesArr);
        }
        if (step === 2) {
            console.log("Calculate random index");
            createRandomIndex();
        }
    }, [results]);

    // create category elements
    const[selectedCategories, setSelectedCategories] = useState([]);

    const handleCategorySelectAdd = (item) => {
        console.log('Adding ' + item);
        setSelectedCategories([...selectedCategories, item]);
    };

    const handleCategorySelectRemove = (item) => {
        console.log('Removing ' + item);
        setSelectedCategories(selectedCategories.filter(cat => cat !== item));
    }

    const[selectedPrices, setSelectedPrices] = useState([]);

    const handlePriceChange = (e) => {
        const value = e.target.dataset.price;
        if (selectedPrices.indexOf(value) > -1) {
            setSelectedPrices(selectedPrices.filter(price => price !== value));
            e.target.classList.remove("search__prices--price-selected", "btn__select--selected");
        } else {
            setSelectedPrices([...selectedPrices, value]);
            e.target.classList.add("search__prices--price-selected", "btn__select--selected");
        }
    }

    const[randomIndex, setRandomIndex] = useState(0);
    const createRandomIndex = () => {
        const randomNum = Math.floor(Math.random() * (results.length-1));
        setRandomIndex(randomNum);
    }

    const[resultsLink, setResultsLink] = useState("");

    return (
        <div className='search__container'>
            <div className={`search__slide search__slide--${step}`}>
            {
                step === 1 && (
                    <Fragment>
                        <div className="search__form">
                            <input 
                                type='text'
                                className='input__text'
                                placeholder='Address, Area, City, Zip Code'
                                value={params.location && params.location}
                                onChange={handleLocationChange}
                            />
                            <select
                                className='input__select'
                                onChange={handleSelectChange}
                            >
                                <option value='restaurant'>Restaurants</option>
                                <option value='events'>Events</option>
                            </select>
                        </div>
                        <div className="search__buttons">
                            <button className="btn btn__primary center-elem" onClick={() => handleSlideChange(1, 'next')}>Search</button>
                        </div>
                    </Fragment>
                )
            }
            {
                step === 2 && (
                    <Fragment>
                        <div className="search__filters">
                            <div className="search__filters--title">Pick Categories</div>
                            <div className="search__categories">
                                {categories.map((category, idx) => (
                                    <CategoryItem
                                        key={idx}
                                        category={category} 
                                        selectCategoryAddCallback={handleCategorySelectAdd}
                                        selectCategoryRemoveCallback={handleCategorySelectRemove} />
                                ))}
                            </div>
                            <div className="search__filters--title">Pick Price Level</div>
                            <div className="search__prices">
                                    <div className="search__prices--price btn__select" data-price="1" onClick={handlePriceChange}>$</div>
                                    <div className="search__prices--price btn__select" data-price="2" onClick={handlePriceChange}>$$</div>
                                    <div className="search__prices--price btn__select" data-price="3" onClick={handlePriceChange}>$$$</div>
                                    <div className="search__prices--price btn__select" data-price="4" onClick={handlePriceChange}>$$$$</div>
                            </div>
                        </div>
                        <div className="search__buttons">
                            <button className="btn btn__primary" onClick={() => handleSlideChange(2, 'back')}>Back</button>
                            <button className="btn btn__primary" onClick={() => handleSlideChange(2, 'next')}>Search</button>
                        </div>
                    </Fragment>
                )
            }
            {
                step === 3 && (
                    <Fragment>
                        <Link className="search__link" to={`/results?${resultsLink}`}>Full Results <i className="fas fa-arrow-right"></i></Link>
                        <div className="search__results">
                            {
                                results.length > 0 
                                    ? <ResultItem result={results[randomIndex]} />
                                    : <div>No results</div>
                            }   
                        </div>
                        <div className="search__buttons">
                            <button className="btn btn__primary" onClick={() => handleSlideChange(3, 'back')}>Back</button>
                            <button className="btn btn__primary" onClick={createRandomIndex}>Randomize</button>
                        </div>
                    </Fragment>
                )
            }
            </div>
        </div>
    )
}

Search.propTypes = {
    getResultsByParams: PropTypes.func.isRequired,
    resetCategories: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    results: state.results,
    categories: state.categories
})

export default connect(mapStateToProps, { getResultsByParams, resetCategories, getCategories })(Search);