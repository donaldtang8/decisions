import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const ResultItem = ({ result }) => {
    const { alias, name, image_url, is_closed, url, review_count, categories, rating, coordinates, transactions, price, location, phone, display_phone } = result;

    const[transactionsArr, setTransactionsArr] = useState([]);

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
    
    return (
        <div className="result-item__container">
            <div className="result-item__img">
                <img src={image_url} alt={name} />
            </div>
            <div className="result-item__details">
                <div className="result-item__details--name">{name}</div>
                <div className="result-item__details--categories">
                    {
                        categories.map((category, idx) => (
                            <div key={idx} className="result-item__details--categories-item">{category.title}</div>
                        ))
                    }
                </div>
                <div className="result-item__details--info">
                    <div className="result-item__details--rating"><i className="fas fa-star"></i> {rating} •    </div>
                    <div className="result-item__details--price">{price}</div>
                </div>
                <div className="result-item__details--services">
                    <div className="result-item__details--hours">
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
                                <div key={idx} className="result-item__details--service"><i className="fas fa-check-circle"></i> {transaction}</div>
                            ))
                        }
                        </Fragment>
                    }
                </div>
            </div>
            {/* <div className="result-item--phone">{phone}</div> */}
        </div>
    )
}

ResultItem.propTypes = {
    result: PropTypes.object.isRequired,
}

export default ResultItem;