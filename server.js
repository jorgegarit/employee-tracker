// this file will be mainly used for testing using insmonia since 
// presentation will be done using the index file 

const express = require('express');
const db = require('./db/connection')
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware for express
app.unsubscribe(express.urlencoded({ extended: false }));
app.use(express.json());

// call to use apiRoutes
app.use('/api', apiRoutes);

// Not found response for other request
app.use((req, res) => {
    res.status(404).end();
});

// starting server after connection to database
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

