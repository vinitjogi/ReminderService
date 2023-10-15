const { Op } = require('sequelize');
const { NotificationTickit } = require('../models/index')

class TickitRepository{


    async getAll(){
        try {
            const tickits = await NotificationTickit.findAll();
            return tickits;
        } catch (error) {
            throw error;
        }
    }

    async create(data){
        try {
            // console.log(data);
            const tickit = await NotificationTickit.create(data);
            return tickit;
        } catch (error) {
            console.log(error);
            throw error;
        }
    } 

    async get(filter){
        try {
            const tickits = await NotificationTickit.findAll({
                where : {
                    status : filter.status,
                    notificationTime : {
                        [Op.lte] : new Date()
                    }
                }
            });
            return tickits;
        } catch (error) {
            throw error;
        }
    }

    async update(tickitId, data){
        try {
            const tickit = await NotificationTickit.findByPk(tickitId);
            if(data.status){
                tickit.status = data.status;
            }
            await tickit.save();
            return tickit;
        } catch (error) {
            
        }
    }   

}


module.exports = TickitRepository;