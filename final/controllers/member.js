const  Member = require('../models').Member;

module.exports = {
    add(req, res){
        return Member
            .create({
                mem_name: req.body.mem_name,
                phone_number: req.body.phone_number,
            })
            .then((member) => res.status(201).send(member))
            .catch((error) => res.status(400).send(error));
    },
    list(req, res){
        return Member
            .findAll({
              order: [
                ['id'],
              ],  
            })
            .then((member) => res.status(201).send(member))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res){
        return Member
            .findByPk(req.params.mem_id,{

            })
            .then((member) =>{
                if (!member){
                    return res.status(404).send({
                        message: 'Member not found',
                    });
                }
                return res.status(200).send(member);
            })
            .catch((error) => res.status(400).send(error));
    },
    search(req, res){
        return Member
            .findAll({
              order: [
                ['id'],
              ],
              where: {
                  [req.params.method]: [req.params.value]
              },  
            })
            .then((member) =>{
                if (!member){
                    return res.status(404).send({
                        message: 'Member not found',
                    });
                }
                return res.status(200).send(member);
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res){
        return Member
            .findByPk(req.params.mem_id,{

            })
            .then(member => {
                if(!member){
                    return res.status(404).send({
                        message: 'member not found',
                    });
                }
                return member
                    .update({
                        mem_name: req.body.mem_name || member.mem_name,
                        phone_number: req.body.phone_number || member.phone_number,
                    })
                    .then(() => res.status(200).send(member))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    /*delete(req, res){
        return Member
            .findAll({
                order: [
                ['id'],
                ],
                where: {
                    [req.params.method]: [req.params.value]
                },  
            })
            .then(member => {
                if(!member){
                    return res.status(400).send({
                        message: 'member not found',
                    });
                }
                return member
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    */
    delete(req, res){
        return Member
            .destroy({
                where: {
                    [req.params.method]: [req.params.value],
                }
            })
            .then(member => {
                return res.status(200).send(member.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
    count(req, res){
        return Member
            .count()
            .then(membercount =>{
                return res.status(200).send(membercount.toString());
            })
            .catch((error) => res.status(400).send(error));
    },
};