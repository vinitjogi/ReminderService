const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');

const setupAndStartServer = () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);

        sendBasicEmail(
            'support@admin.com',
            'mokshajogi2005@gmail.com',
            'This is a testing email',
            'Hey, how are you, I hope you like our service'
        )
    });

}

setupAndStartServer();