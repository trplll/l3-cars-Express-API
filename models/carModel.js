var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var carModel = new Schema({
    brand: {type: String},
    model: {type: String},
    engine: {type: String},
    horsepower: {type: Number}
});

module.exports= mongoose.model('Car', carModel);