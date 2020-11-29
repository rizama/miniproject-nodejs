const express = require('express');

const router = express.Router();

const xlsx = require('xlsx');

const rootPath = __dirname;

const responseError = (message = "something went wrong") => {
    return {
        code: 400,
        mesage: message,
        data: null
    };
}

router.post('/', (req, res) => {
    try {
        let workBook = xlsx.readFile(`${rootPath}/files/database.xlsx`, { cellDates: true });
        const selectedSheet = workBook.SheetNames[0]; // just read first sheet of xlxs file
        let workSheet = workBook.Sheets[selectedSheet];

        let data = xlsx.utils.sheet_to_json(workSheet);

        const id = req.body.id;
        const email = req.body.email;
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const avatar = req.body.avatar;

        data.push({
            id: id,
            email: email,
            first_name: firstName,
            last_name: lastName,
            avatar: avatar
        });

        let newWorkBook = xlsx.utils.book_new();
        let newWorkSheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(newWorkBook, newWorkSheet, selectedSheet);
        xlsx.writeFile(newWorkBook, `${rootPath}/files/database.xlsx`);

        res.json({
            code: 201,
            mesage: "created",
            data: {
                id: id,
                email: email,
                firstName: firstName,
                lastName: lastName,
                avatar: avatar
            }
        });

    } catch (error) {
        return res.status(400).responseError(error)
    }
});

router.get('/', (req, res) => {
    const patternNumber = /^\d+$/;
    try {
        if (!req.query.page) {
            return res.json(responseError("page params is required"));
        }
        if (parseInt(req.query.page) <= 0) {
            return res.json(responseError("page params must bigger than 0 (zero)"));
        } if (!patternNumber.test(req.query.page)) {
            return res.json(responseError("page params must be a Number"));
        }

        let workBook = xlsx.readFile(`${rootPath}/files/database.xlsx`, { cellDates: true });
        const selectedSheet = workBook.SheetNames[0];
        let workSheet = workBook.Sheets[selectedSheet];
        let data = xlsx.utils.sheet_to_json(workSheet);

        const default_page = 1;
        const default_limit = 5;
        const page = req.query.page || default_page;
        const limit = req.query.limit || default_limit;

        const results = paginatted(page, limit, data);

        res.json({
            code: 200,
            mesage: "success",
            data: results
        });

    } catch (error) {
        return res.status(400).responseError();
    }
});

const paginatted = (paramsPage, paramsLimit, model) => {
    const page = parseInt(paramsPage);
    const limit = parseInt(paramsLimit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit

    const results = {}

    if (endIndex < model.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    } else {
        results.next = {
            page: null,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    } else {
        results.previous = {
            page: null,
            limit: limit
        }
    }
    
    results.total_page = Math.ceil(model.length / limit);
    
    results.total_data = model.length;

    results.results = model.slice(startIndex, endIndex);

    return results;
}

module.exports = router;
