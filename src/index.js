const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
// const { sendBasicEmail } = require('./services/email-service');
// const cron = require('node-cron');
const TickitController = require('./controllers/tickit-controller')
const jobs = require('./utils/jobs');

const setupAndStartServer = () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));


    app.post('/api/v1/tickits', TickitController.create);


    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
        jobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //     'mokshajogi2005@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like our service'
        // )
    });

}

setupAndStartServer();