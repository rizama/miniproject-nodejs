const express = require('express');

const router = express.Router();

const checkIsPrime = (number) => {
    const max = Math.sqrt(number);

    for (let i = 2; i <= max; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}

const responseError = (message = "something went wrong") => {
    return {
        code: 500,
        mesage: message,
        data: null
    };
}

router.get('/', (req, res) => {

    const patternNumber = /^\d+$/;

    if (!req.query.start) {
        return res.json(responseError("Need query params 'start'. e.g localhost:5000/api/prime?start=100"));
    } if (parseInt(req.query.start) <= 0) {
        return res.json(responseError("Number must be bigger than 0."));
    } if (!patternNumber.test(req.query.start)) {
        return res.json(responseError("Value must be a Number"));
    }

    let start = parseInt(req.query.start) + 1;
    const limit = 20;
    let primes = [];

    while (primes.length != limit) {
        if (checkIsPrime(start)) {
            primes.push(start);
        }
        start++
    }

    res.json({
        code: 200,
        mesage: "success",
        data: primes
    });
});

module.exports = router;
