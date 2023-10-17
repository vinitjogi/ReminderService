const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
// const { sendBasicEmail } = require('./services/email-service');
// const cron = require('node-cron');
const TickitController = require('./controllers/tickit-controller')
// const jobs = require('./utils/jobs');
const { createChannel, subscribeMessage } = require('./utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');

const emailService = require('./services/email-service');

const setupAndStartServer = async () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    // const channel = await createChannel();

    app.post('/api/v1/tickits', TickitController.create);

    const channel = await createChannel();
    subscribeMessage(channel, emailService.subscribeEvents, REMINDER_BINDING_KEY)

    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
        // jobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //     'mokshajogi2005@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like our service'
        // )
    });

}

setupAndStartServer();