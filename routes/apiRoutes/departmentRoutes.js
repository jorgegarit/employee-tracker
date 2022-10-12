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

// get only one department
router.get("/department/:id", (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// create a new department 
router.post('/department', ({ body }, res) => {
    // validation check
    const errors = inputCheck(body, 'name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO departments (name)
        VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});


module.exports = router;