const express = require('express');
const router = express.Router();

// connects api route to database
const db = require('../../db/connection');
// used for validation check 
const inputCheck = require('../../utils/inputCheck')

// get all roles
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;

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

// get only one role
router.get("/role/:id", (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
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

// create a new role
router.post('/role', ({ body }, res) => {
    // validation check
    const errors = inputCheck(body, 'title', 'salary');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO roles (title, salary)
        VALUES (?,?)`;
    const params = [body.title, body.salary];

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