const mongoose = require('mongoose');

const employeeWorkLogSchema = new mongoose.Schema({
    employeeName: { type: String, required: true },
    services: [{ type: String }],
    totalPrice: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

const EmployeeWorkLog = mongoose.model('EmployeeWorkLog', employeeWorkLogSchema);

module.exports = EmployeeWorkLog;


