const mongoose = require('mongoose');
const Employees = require('./employee');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

const port = process.env.port;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {'dbName': "employeeDB2"});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// GET enpoint
app.get('/api/employees', async (req, res) => {
    const documents = await Employees.find();
    res.json(documents); // Sending the retrieved documents as JSON objects.
});

app.post('/api/employees', async (req, res) => {
    console.log(req);
    const data = req.body;
    const emp = new Employees({
        "emp_name": data['name'],
        "age": data['age'],
        "location": data['location'],
        "email": data['email']
    });
    // Save the employee to the database
    await emp.save();
    res.json({ message: "Employee added successfully" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
