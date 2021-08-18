require('dotenv').config();
const { catchAsync } = require('./../utils/catchAsync');
const axios = require('axios');

let API_KEY = process.env.API_KEY;
const headers = {
    Authorization: `Bearer ${API_KEY}`,
    'Content-type': 'application/json'
}

// creates a new Axios instance and set base properties on it
let yelpREST = (method) => {
    return axios.create({
        baseURL: 'https://api.yelp.com/v3/',
        headers,
        method
    });
}

exports.getResultsBySearch = catchAsync(async (req, res, next) => {
    let yelpReq = yelpREST('GET');
    let response = await yelpReq('/businesses/search', {
        params: req.body
    });
    let businesses = response.data.businesses;
    let totalResults = response.data.total;
    res.status(200).json({
        status: 'success',
        data: businesses,
        total: totalResults
    })
})