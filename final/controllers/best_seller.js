const  Bestseller = require('../models').Best_seller;
const  Book = require('../models').Book;

module.exports = {
    add(req, res){
        return Bestseller
            .create({
                book_id: req.body.book_id,
                rank: req.body.rank,
                book_type: req.body.type,
            })
            .then((bestseller) => res.status(201).send(bestseller))
            .catch((error) => res.status(400).send(error));
    },
    
    list(req, res){
        return Bestseller
            .findAll({
              order: [
                ['id'],
              ],  
            })
            .then((bestseller) => res.status(201).send(bestseller))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res){
        return Bestseller
            .findByPk(req.params.book_id,{

            })
            .then((bestseller) =>{
                if (!bestseller){
                    return res.status(404).send({
                        message: 'Bestseller not found',
                    });
                }
                return res.status(200).send(bestseller);
            })
            .catch((error) => res.status(400).send(error));
    },
    search(req, res){
        return Bestseller
            .findAll({
              order: [
                ['id'],
              ],
              where: {
                  [req.params.method]: [req.params.value]
              },  
            })
            .then((bestseller) =>{
                if (!bestseller){
                    return res.status(404).send({
                        message: 'Bestseller not found',
                    });
                }
                return res.status(200).send(bestseller);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res){
        return Bestseller
            .findByPk(req.params.book_id,{

            })
            .then(bestseller => {
                if(!bestseller){
                    return res.status(404).send({
                        message: 'Bestseller not found',
                    });
                }
                return bestseller
                    .update({
                        rank: req.body.rank || bestseller.rank,
                        type: req.body.type || bestseller.type,
                    })
                    .then(() => res.status(200).send(bestseller))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    /*
    delete(req, res){
        return Bestseller
            .findByPk(req.params.book_id)
            .then(bestseller => {
                if(!bestseller){
                    return res.status(400).send({
                        message: 'Bestseller not found',
                    });
                }
                return bestseller
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },*/
    delete(req, res){
        return Bestseller
            .destroy({
                where: {
                    [req.params.method]: [req.params.value],
                }
            })
            .then(bestseller => {
                return res.status(200).send(bestseller.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
};