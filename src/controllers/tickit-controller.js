const TickitService = require('../services/email-service');


const create = async(req,res) => {
    try {
        // console.log(req.body);
        const response = await TickitService.createNotification(req.body);
        return res.status(201).json({
            success : true,
            data : response,
            err : {},
            message : 'successfully registerd email reminder'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            data : response,
            err : error,
            message : 'unable to register an email reminder'
        });
    }
}


module.exports = { 
    create
}