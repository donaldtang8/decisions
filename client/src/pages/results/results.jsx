import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getResultsByFilters } from '../../redux/actions/results';
import { resetCategories, getCategories } from '../../redux/actions/categories';

import { useEffect } from 'react';

import ResultItem from './../../components/search/result-item';
import CategoryItem from './../../components/categories/category-item';
import Spinner from './../../components/spinner/spinner';

import { getCategoriesFromResults } from './../../utils/resultsOperations';

const Results = ({ getResultsByFilters, resetCategories, getCategories, categories: { categories }, results: { results } }) => {
    // keeps track of which window we're at
    const [step, setStep] = useState(1);

    // array of activity terms (food, indoor recreation, etc)
    const [terms, setTerms] = useState([
        { 
            alias: 'Food',
            name: 'restaurant'
        }
    ]);

    const handleTermChange = term => {
        setFilters({ ...filters, term: term.name});
        setStep(step+1);
    }

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

    // object containing possible params to include in url query string to use in filter
    const[filters, setFilters] = useState({
        limit: 50,
        location: '',
        term: '',
    });

    // update location 
    const handleLocationChange = e => {
        setFilters({ ...filters, location: e.target.value });
    }

    useEffect(() => {
        if (step === 2) {
            const categoriesArr = getCategoriesFromResults(results);
            getCategories(categoriesArr);
        }
    }, [results])

    // when we're on the third slide, there are two scenarios
    // 1. its our first time on the third slide, and there are no categories
    // 2. we have moved back to the third slide and there are categories already selected
    // approach - everytime we hit the 3rd slide, we check if there are already categories selected - if yes, retrieve them
    // everytime we go below the 3rd slide, we have to reset the category selections
    const handleSlideChange = async (slideIdx, direction) => {
        if (slideIdx === 2) {
            if (filters.location.length > 0) {
                await getResultsByFilters(filters);
            }
        }
        if (slideIdx === 3) {
            if (direction === 'back') resetCategories();
            else {
                if (selectedCategories.length > 0) {
                    filters['categories'] = selectedCategories.toString();
                    await getResultsByFilters(filters);
                    createRandomIndex();
                }
            }
        }
        if (slideIdx >= 3) {
            // reset selectedCategories array
            setSelectedCategories([]);
            delete filters.categories;
        }
        await setStep(direction === 'back' ? step-1 : step + 1);
    }

    const [mode, setMode] = useState('results');
    const [randomIndex, setRandomIndex] = useState(0);

    const createRandomIndex = () => {
        const randomNum = Math.floor(Math.random() * results.length-1);
        setRandomIndex(randomNum);
        console.log('Random number is now: ' + randomNum);
    }

    const handleMode = newMode => {
        if (newMode === 'random') {
            const randomNum = Math.floor(Math.random() * results.length-1);
            setRandomIndex(randomNum);
            console.log('Random number is now: ' + randomNum);
            setMode('random');
        } else {
            setMode('results');
        }
    }

    return categories.loading || results.loading ? <Spinner /> : (
        <div className='search__container'>
            {/* Pick a category */}
            <div className={`search__slide search__slide--${step}`}>
                <input 
                    type='text'
                    className='input__text'
                    placeholder='Enter a location'
                    value={filters.location && filters.location}
                    onChange={handleLocationChange}
                />
                {
                    step === 1 ? (
                        <Fragment>
                            <div className='search__title'>Pick a Category</div>
                            <div className={`search__wrapper search__wrapper--${step}`}>
                                {terms.map((term, idx) => (
                                    <div key={idx} className='search__wrapper--term btn btn__primary' onClick={() => handleTermChange(term)}>{term.alias}</div>
                                ))}
                            </div>
                        </Fragment>
                    ) : (
                        step === 2 ? (
                            <Fragment>
                                    <div className='search__title'>What's your location?</div>
                                    <div className={`search__wrapper search__wrapper--${step}`}>
                                        <input 
                                            type='text'
                                            className='input__text'
                                            placeholder='Location'
                                            value={filters.location && filters.location}
                                            onChange={handleLocationChange}
                                        />
                                        <div className='search__wrapper--buttons'>
                                            <button className='btn btn__secondary' onClick={() => handleSlideChange(2, 'back')}>Back</button>
                                            <button className='btn btn__primary' onClick={() => handleSlideChange(2, 'next')}>Next</button>
                                        </div>
                                    </div>
                                </Fragment>
                        ) : (
                            step === 3 ? (
                                <Fragment>
                                    <div className='search__title'>Choose your categories:</div>
                                    <div className={`search__wrapper search__wrapper--${step}`}>
                                        <div className='search__categories'>
                                            {categories.map((category, idx) => (
                                                <CategoryItem
                                                    key={idx}
                                                    category={category} 
                                                    selectCategoryAddCallback={handleCategorySelectAdd}
                                                    selectCategoryRemoveCallback={handleCategorySelectRemove} />
                                            ))}
                                        </div>
                                        <div className='search__wrapper--buttons'>
                                            <button className='btn btn__secondary' onClick={() => handleSlideChange(3, 'back')}>Back</button>
                                            <button className='btn btn__primary' onClick={() => handleSlideChange(3, 'next')}>Show Results</button>
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div className='search__title'>Results</div>
                                    <div className={`search__wrapper search__wrapper--${step}`}>
                                        {
                                            mode === 'results' ? (
                                                <button className='btn btn__primary' onClick={() => handleMode('random')}>I'm Feeling Hungry!</button>
                                            ) : (
                                                <button className='btn btn__primary' onClick={() => handleMode('results')}>Show All Results</button>
                                            )
                                        }
                                            <div className='search__results'>
                                            {
                                                mode === 'random' ? (
                                                    <ResultItem result={results[randomIndex]} />
                                                ) : (
                                                    results.map(result => <ResultItem key={result.id} result={result} />)
                                                )
                                            }
                                            </div>
                                        <div className='search__wrapper--buttons'>
                                            <button className='btn btn__secondary' onClick={() => handleSlideChange(4, 'back')}>Back</button>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        )
                    )
                }
                
            </div>
        </div>
    )
}

Results.propTypes = {
    getResultsByFilters: PropTypes.func.isRequired,
    resetCategories: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    results: state.results,
    categories: state.categories
})

export default connect(mapStateToProps, { getResultsByFilters, resetCategories, getCategories })(Results);