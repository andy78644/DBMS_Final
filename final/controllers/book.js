const  Book = require('../models').Book;
const { Sequelize } = require('../models');
const db = require('../models');
module.exports = {
    add(req, res){
        return Book
            .create({
                book_name: req.body.book_name,
                price: req.body.price,
                count: req.body.count,
            })
            .then((book) => res.status(201).send(book))
            .catch((error) => res.status(400).send(error));
    },
    list(req, res){
        return Book
            .findAll({
              order: [
                ['id'],
              ],  
            })
            .then((book) => res.status(201).send(book))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res){
        return Book
            .findByPk(req.params.book_id,{

            })
            .then((book) =>{
                if (!book){
                    return res.status(404).send({
                        message: 'Book not found',
                    });
                }
                return res.status(200).send(book);
            })
            .catch((error) => res.status(400).send(error));
    },
    search(req, res){
        return Book
            .findAll({
              order: [
                ['id'],
              ],
              where: {
                  [req.params.method]: [req.params.value]
              },  
            })
            .then((book) =>{
                if (!book){
                    return res.status(404).send({
                        message: 'Book not found',
                    });
                }
                return res.status(200).send(book);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res){
        return Book
            .findByPk(req.params.book_id,{

            })
            .then(book => {
                if(!book){
                    return res.status(404).send({
                        message: 'Book not found',
                    });
                }
                return book
                    .update({
                        book_name: req.body.book_name || book.book_name,
                        price: req.body.price || book.price,
                        count: req.body.count || book.count,
                    })
                    .then(() => res.status(200).send(book))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    /*delete(req, res){
        return Book
            .findByPk(req.params.book_id)
            .then(book => {
                if(!book){
                    return res.status(400).send({
                        message: 'Book not found',
                    });
                }
                return book
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    */
    delete(req, res){
        return Book
            .destroy({
                where: {
                    [req.params.method]: [req.params.value],
                }
            })
            .then(book => {
                return res.status(200).send(book.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    count(req, res){
        return Book
            .count()
            .then(bookcount =>{
                return res.status(200).send(bookcount.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    sum(req, res){
        return Book
            .sum('count')
            .then(booksum => {
                return res.status(200).send(booksum.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    max(req, res){
        return Book
            .max('price')
            .then(maxprice => {
                return res.status(200).send(maxprice.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    min(req, res){
        return Book
            .min('price')
            .then(minprice => {
                return res.status(200).send(minprice.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    
    avg(req, res){
        //console.log('abc');
        //return res.status(200).send('addd');
        return Book
            .findAll({
                attributes: [[Sequelize.fn('AVG', Sequelize.col('price')), 'avgprice']],
                
            })
            .then(avgprice => {
                console.log(avgprice);
                return res.status(200).send(avgprice);
            })
            .catch((error) => res.status(400).send(error));
    }
};