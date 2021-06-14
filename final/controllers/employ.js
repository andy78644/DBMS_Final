const  Employ = require('../models').Employ;

module.exports = {
    add(req, res){
        return Employ
            .create({
                emp_name: req.body.emp_name,
                phone_number: req.body.phone_number,
            })
            .then((employ) => res.status(201).send(employ))
            .catch((error) => res.status(400).send(error));
    },
    list(req, res){
        return Employ
            .findAll({
              order: [
                ['id'],
              ],  
            })
            .then((employ) => res.status(201).send(employ))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res){
        return Employ
            .findByPk(req.params.emp_id,{

            })
            .then((employ) =>{
                if (!employ){
                    return res.status(404).send({
                        message: 'Employ not found',
                    });
                }
                return res.status(200).send(employ);
            })
            .catch((error) => res.status(400).send(error));
    },
    search(req, res){
        return Employ
            .findAll({
              order: [
                ['id'],
              ],
              where: {
                  [req.params.method]: [req.params.value]
              },  
            })
            .then((employ) =>{
                if (!employ){
                    return res.status(404).send({
                        message: 'Employ not found',
                    });
                }
                return res.status(200).send(employ);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res){
        return Employ
            .findByPk(req.params.emp_id,{

            })
            .then(employ => {
                if(!employ){
                    return res.status(404).send({
                        message: 'Employ not found',
                    });
                }
                return employ
                    .update({
                        emp_name: req.body.emp_name || employ.emp_name,
                        phone_number: req.body.phone_number || employ.phone_number,
                    })
                    .then(() => res.status(200).send(employ))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    /*
    delete(req, res){
        return Employ
            .findByPk(req.params.emp_id)
            .then(employ => {
                if(!employ){
                    return res.status(400).send({
                        message: 'Employ not found',
                    });
                }
                return employ
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },*/
    delete(req, res){
        return Employ
            .destroy({
                where: {
                    [req.params.method]: [req.params.value],
                }
            })
            .then(employ => {
                return res.status(200).send(employ.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    count(req, res){
        return Employ
            .count()
            .then(employcount =>{
                return res.status(200).send(employcount.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
};