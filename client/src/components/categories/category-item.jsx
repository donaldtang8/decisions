import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CategoryItem = ({ category, selectCategoryAddCallback, selectCategoryRemoveCallback }) => {
    const[clicked, setClicked] = useState(false);

    const handleClick = () => {
        if (!clicked) {
            selectCategoryAddCallback(category.alias);
        } else {
            selectCategoryRemoveCallback(category.alias);
        }
        setClicked(!clicked);
    }

    return (
        <div className={clicked ? 'category__item btn__select btn__select--selected' : 'category__item btn__select'} onClick={handleClick}>
            {category.title}
        </div>
    )
}

CategoryItem.propTypes = {
    category: PropTypes.object.isRequired,
    selectCategoryAddCallback: PropTypes.func.isRequired,
    selectCategoryRemoveCallback: PropTypes.func.isRequired,
}

export default CategoryItem;