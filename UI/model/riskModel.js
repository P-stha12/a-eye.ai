let mongoose = require('mongoose');
const scema  = new mongoose.Scema({
    patient:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'patientModel'
    }]
})

module.exports  = mongoose.model('riskModel',scema);