const  Salerecord = require('../models').Salerecord;
const { Sequelize, sequelize } = require('../models');
const db = require('../models');
module.exports = {
    add(req, res){
        return Salerecord
            .create({
                date: req.body.date,
                selling_price: req.body.selling_price,
                mem_id: req.body.mem_id,
                emp_id: req.body.emp_id,
                check_id: req.body.check_id,
                book_id: req.body.book_id,
            })
            .then((salerecord) => res.status(201).send(salerecord))
            .catch((error) => res.status(400).send(error));
    },
    list(req, res){
        return Salerecord
            .findAll({
              order: [
                ['id'],
              ],  
            })
            .then((salerecord) => res.status(201).send(salerecord))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res){
        return Salerecord
            .findByPk(req.params.record_id,{

            })
            .then((salerecord) =>{
                if (!salerecord){
                    return res.status(404).send({
                        message: 'Salerecord not found',
                    });
                }
                return res.status(200).send(salerecord);
            })
            .catch((error) => res.status(400).send(error));
    },
    search(req, res){
        return Salerecord
            .findAll({
              order: [
                ['id'],
              ],
              where: {
                  [req.params.method]: [req.params.value]
              },  
            })
            .then((salerecord) =>{
                if (!salerecord){
                    return res.status(404).send({
                        message: 'Salerecord not found',
                    });
                }
                return res.status(200).send(salerecord);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res){
        return Salerecord
            .findByPk(req.params.record_id,{

            })
            .then(salerecord => {
                if(!salerecord){
                    return res.status(404).send({
                        message: 'salerecord not found',
                    });
                }
                return salerecord
                    .update({
                        mem_name: req.body.mem_name || salerecord.mem_name,
                        phone_number: req.body.phone_number || salerecord.phone_number,
                        date: req.body.date || salerecord.date,
                        selling_price: req.body.selling_price || salerecord.selling_price,
                        mem_id: req.body.mem_id || salerecord.mem_id,
                        emp_id: req.body.emp_id || salerecord.emp_id,
                        check_id: req.body.check_id || salerecord.check_id,
                        book_id: req.body.book_id || salerecord.book_id,
                    })
                    .then(() => res.status(200).send(salerecord))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    /*
    delete(req, res){
        return Salerecord
            .findByPk(req.params.record_id)
            .then(salerecord => {
                if(!salerecord){
                    return res.status(400).send({
                        message: 'salerecord not found',
                    });
                }
                return salerecord
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },*/
    delete(req, res){
        return Salerecord
            .destroy({
                where: {
                    [req.params.method]: [req.params.value],
                }
            })
            .then(salerecord => {
                return res.status(200).send(salerecord.toString());
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            
            });
    },
    count(req, res){
        return Salerecord
            .count()
            .then(salerecordcount =>{
                return res.status(200).send(salerecordcount.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    sum(req, res){
        return Salerecord
            .sum('selling_price')
            .then(salerecordsum => {
                return res.status(200).send(salerecordsum.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    max(req, res){
        return Salerecord
            .max('selling_price', {where:{ book_id: [req.params.book_id]}})
            .then(maxprice => {
                return res.status(200).send(maxprice.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    min(req, res){
        return Salerecord
            .min('selling_price' , {where:{ book_id: [req.params.book_id]}})
            .then(minprice => {
                return res.status(200).send(minprice.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    
    avg(req, res){
        //console.log('abc');
        //return res.status(200).send('addd');
        return Salerecord
            .findAll({
                attributes: ['book_id',[Sequelize.fn('AVG', Sequelize.col('selling_price')), 'avgprice']],
                group : ['book_id'],
                order: ['book_id'],
            })
            .then(avgprice => {
                console.log(avgprice);
                return res.status(200).send(avgprice);
            })
            .catch((error) => res.status(400).send(error));
    },
    async having(req, res){
        //console.log('abc');
        //return res.status(200).send('addd');
        //return Salerecord
        //    .findAll({
        //       attributes: ['book_id',[Sequelize.fn('AVG', Sequelize.col('selling_price')), 'avgprice']],
        /*        group : ['book_id'],
                order: ['book_id'],
                having: [['Sequelize.fn("AVG", Sequelize.col("selling_price")), "avgprice"] > 35']],
            })
            .then(avgprice => {
                console.log(avgprice);
                return res.status(200).send(avgprice);
            })
            .catch((error) => res.status(400).send(error));*/
        const [results, metadata] = await sequelize.query(' SELECT "book_id", AVG("selling_price") AS "avgprice" FROM "Salerecords" AS "Salerecord" GROUP BY "book_id" HAVING AVG("selling_price") > 35 ORDER BY "Salerecord"."book_id";');
        return res.status(200).send(metadata);
    },
    async raw(req,res){
        console.log([req.body.raw]);
        const [results, metadata] = await sequelize.query(req.body.raw);
        return res.status(200).send(metadata);
        //'SELECT *  FROM "Salerecords" AS "Salerecord"'
    }
};