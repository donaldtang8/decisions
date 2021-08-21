import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ResultItem = ({ result }) => {
    const { alias, name, image_url, is_closed, url, review_count, rating, coordinates, transactions, price, location, phone, display_phone } = result;
    
    return (
        <div className="result-item__container">
            <div className="result-item__img">
                <img src={image_url} alt={name} />
            </div>
            <div className="result-item__details">
                <div className="result-item__details--name">{name}</div>
                <div className="result-item__details--info">
                    <div className="result-item__details--rating">{rating}/5</div>
                    <div className="result-item__details--price">{price}</div>
                    <div className={"result-item__details--hours"}>{!is_closed ? 'Open' : 'Closed'}</div>
                </div>
                {
                    transactions.length > 0 && <div className="result-item__details--services">
                    {
                        transactions.map(transaction => (
                            <div className="result-item--service">{transaction}</div>
                        ))
                    }
                    </div>
                }
                
            </div>
            {/* <div className="result-item--phone">{phone}</div> */}
        </div>
    )
}

ResultItem.propTypes = {
    result: PropTypes.object.isRequired,
}

export default ResultItem;