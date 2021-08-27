import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { useLocation, withRouter } from 'react-router-dom'

import { getResultsByParams } from '../../redux/actions/results';
import { resetCategories, getCategories } from '../../redux/actions/categories';

import CategoryItem from './../../components/categories/category-item';
import Spinner from './../../components/spinner/spinner';

import { getCategoriesFromResults } from './../../utils/resultsOperations';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchFilter = ({ getResultsByParams, resetCategories, getCategories, categories, results, history, location, match }) => {
    let query = useQuery();

    const[params, setParams] = useState({
        limit: 50,
        location: query.get("location"),
        term: query.get("term"),
    });

    useEffect(() => {
        async function getResults() {
            await getResultsByParams(params);
        }
        getResults();
    }, []);

    useEffect(() => {
        const categoriesArr = getCategoriesFromResults(results.results);
        getCategories(categoriesArr);
    }, [results]);

    // create category elements
    const[selectedCategories, setSelectedCategories] = useState([]);

    const handleCategorySelectAdd = (item) => {
        setSelectedCategories([...selectedCategories, item]);
    };

    const handleCategorySelectRemove = (item) => {
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

    const handleSlideChange = async (direction) => {
        if (direction === 'back') {
            resetCategories();
            history.push('/');
        }
        else {
            if (selectedCategories.length > 0) {
                params['categories'] = selectedCategories.toString();
            }
            if (selectedPrices.length > 0) {
                params['prices'] = selectedPrices.toString();
            }
            await getResultsByParams(params);
            handleNext();
        }
        // reset selectedCategories array
        setSelectedCategories([]);
        delete params.categories;
    }

    const handleNext = () => {
        let link = `/result?location=${params.location}&term=${params.term}`;
        if (params.categories) link += `&categories=${selectedCategories.toString()}`;
        if (params.prices) link += `&prices=${selectedPrices.toString()}`;
        history.push(link);
    }

    return categories.loading || results.loading ? <Spinner /> : (
        <div className='search__container'>
            <div className='search__slide search__slide--2'>
                <div className="search__filters">
                    <div className="search__filters--title">Pick Categories</div>
                    <div className="search__categories">
                        {categories.categories.map((category, idx) => (
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
                    <button className="btn btn__primary" onClick={() => handleSlideChange('back')}>Back</button>
                    <button className="btn btn__primary" onClick={() => handleSlideChange('next')}>Next</button>
                </div>
            </div>
        </div>
    )
}

SearchFilter.propTypes = {
    getResultsByParams: PropTypes.func.isRequired,
    resetCategories: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    results: state.results,
    categories: state.categories
})

export default connect(mapStateToProps, { getResultsByParams, resetCategories, getCategories })(withRouter(SearchFilter));