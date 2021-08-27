import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { focusMarkerOnMap } from '../../redux/actions/maps';

const Result = ({ result, index, focusMarkerOnMap }) => {
    const { alias, name, image_url, is_closed, url, review_count, categories, rating, coordinates, transactions, price, location, phone, display_phone } = result;

    // const[transactionsArr, setTransactionsArr] = useState([]);

    // useEffect(() => {
    //     transactions.map(transaction => {
    //         if (transaction.indexOf('_') > -1) {
    //             console.log(transaction);
    //             const newStr = transaction.replace('_', ' ');
    //             console.log(newStr);
    //             setTransactionsArr([...transactionsArr, newStr]);
    //         } else {
    //             setTransactionsArr([...transactionsArr, transaction]);
    //             console.log(transaction);
    //         }
    //     });
    // }, []);

    const handleSelectMarker = () => {
        focusMarkerOnMap(index);
    }

    const handleRemoveSelectMarker = () => {
        focusMarkerOnMap(null);
    }
    
    return (
        <a href={url} target="_blank" rel="noopener">
            <div className="result__container" onMouseOver={() => handleSelectMarker()} onMouseOut={handleRemoveSelectMarker}>
                <div className="result__wrapper">
                    <div className="result__img">
                        <img src={image_url} alt={name} />
                    </div>
                    <div className="result__details">
                        <div className="result__details--name">{index+1}. {name}</div>
                        <div className="result__details--categories">
                            {
                                categories.map((category, idx) => (
                                    <div key={idx} className="result__details--categories-item">{category.title}</div>
                                ))
                            }
                        </div>
                        <div className="result__details--info">
                            <div className="result__details--rating"><i className="fas fa-star"></i> {rating}</div>
                            <div className="result__details--price"> • {price}</div>
                        </div>
                        <div className="result__details--services">
                            <div className="result__details--hours">
                                {
                                    !is_closed ? (
                                        <Fragment><i className="fas fa-check-circle"></i> Open</Fragment>
                                    ) : (
                                        <Fragment><i className="fas fa-times-circle"></i> Closed</Fragment>
                                    )
                                }
                            </div>
                            {
                                transactions.length > 0 && <Fragment>
                                {
                                    transactions.map((transaction, idx) => (
                                        <div key={idx} className="result__details--service"><i className="fas fa-check-circle"></i> {transaction}</div>
                                    ))
                                }
                                </Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

Result.propTypes = {
    result: PropTypes.object.isRequired,
}

export default connect(null, { focusMarkerOnMap })(Result);