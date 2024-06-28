const { collection, getDocs } = require("firebase/firestore");
const { database } = require("../config/firebase");
const CareerQuest = require("../models/career");
const OrientationResult = require("../models/orientation_result");

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

const createResult = async (data) => {
    try {
        const orientationResult = new OrientationResult(data);
        return await orientationResult.save();
    }
    catch (err) {
        throw Error("Lỗi khi tạo kết quả");
    }
}

const getResults = async () => {
    try {
        return await OrientationResult.find();
    }
    catch (err) {
        return err;
    }
}

module.exports = { getCareers, createQuestions, getQuestions, createResult, getResults }; 