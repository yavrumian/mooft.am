const mongoose = require('mongoose')

exports.exists = async(model, query) => {
    try {
        const result = await mongoose.model(model).findOne(query);
        if(result) return true
        throw false
    }catch(e) {
        console.log(e);
        throw e
    }
}
