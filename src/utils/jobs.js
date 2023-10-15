const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../models/index')

const setupJobs = () => {
    cron.schedule('*/2 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
           sender.sendmail({
            to : email.recepientEmail,
            subject : email.subject,
            text : email.content
        }, async (err, data) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(data);
                await emailService.updateTickit(email.id, {status : 'SUCCESS'});
            }
        });
        });
    });
}

module.exports = setupJobs;
 