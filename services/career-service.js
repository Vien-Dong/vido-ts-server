const { collection, getDocs } = require("firebase/firestore");
const { database } = require("../config/firebase");
const CareerQuest = require("../models/career");

const getCareers = async() => {
    try {
        const careerCol = collection(database, "careers");
        const data = await getDocs(careerCol);
        const careers = data.docs.map(doc => doc.data());
        return careers;
    }
    catch (err) {
        console.log(err);
    }
}

const getQuestions = async () => {
    try {
        return await CareerQuest.find();
    }
    catch (err) {
        return err;
    }
}

const createQuestions = async (data) => {
    try {
        const careerQuest = new CareerQuest(data);
        return await careerQuest.save();
    }
    catch (err) {
        return err;
    }
}

module.exports = { getCareers, createQuestions, getQuestions }; 