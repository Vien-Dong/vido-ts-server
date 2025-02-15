const Class = require("../models/class")

const getClasses = async() => {
    try {
        return await Class.find();
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { getClasses }; 