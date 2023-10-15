const sender = require('../config/emailConfig');
const TickitRepository  = require('../repository/tickit-repository')

const tickitRepository = new TickitRepository();



const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) =>{
    try {
        const response = await sender.sendMail({
            from : mailFrom,
            to : mailTo,
            subject : mailSubject,
            text : mailBody
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const fetchPendingEmails = async(timeStamp) =>{
    try {
        const response = await tickitRepository.get({status : 'PENDING'});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateTickit = async(tickitId, data) => {
    try {
        const response = await tickitRepository.update(tickitId, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        // console.log(data);
        const response = await tickitRepository.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTickit

}