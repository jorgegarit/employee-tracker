const express = require('express');
const router = express.Router();

// connects api route to database
const db = require('../../db/connection');
// used for validation check 
const inputCheck = require('../../utils/inputCheck')

// get all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});