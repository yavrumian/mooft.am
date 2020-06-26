const mongoose = require('mongoose')

exports.isUnique = async(model, query) => {
    try {
        const result = await mongoose.model(model).findOne(query);
        if(result) throw false
        return true
    }catch(e) {
        console.log(e);
        throw e
    }
}
