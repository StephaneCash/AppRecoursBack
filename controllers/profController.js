const db = require('../models');
const { ValidationError } = require('sequelize');
const { Op } = require('sequelize');

const Prof = db.profs;

const addProf = (req, res) => {
    Prof.create(req.body)
        .then(response => {
            const msg = `Professeur créé avec succès`;
            res.status(201).json({ msg, data: response })
        })
        .catch(err => {
            return res.status(500).json({ err: err });
        })
};

const getAllData = (req, res) => {
    console.log("QUERY :: ", req.query)
    
    if (req.query.name) {
        const nom = req.query.name;

        if (nom.length > 1) {
            return Prof.findAll({
                where: {
                    nom: {
                        [Op.like]: "%" + nom + "%"
                    }
                },
                include: [{
                    model: db.cours,
                    as: 'cours'
                }]
            }).then(resp => {
                const msg = `Les données qui correspondent au terme de recherche ${nom} `;
                res.json({ msg, data: resp });
            })
        } else {
            const msg = "Le terme de recherche doit contenir au minimum deux caractères";
            return res.status(400).json({ msg })
        }
    } else {
        Prof.findAll({
            include: [{
                model: db.cours,
                as: 'cours'
            }]
        })
            .then(resp => {
                let taille = resp.length;
                res.status(200).json({ message: 'La liste de profs a été bien trouvée', taille: taille, data: resp, });
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

}

const getOneProf = (req, res) => {
    Prof.findByPk(req.params.id)
        .then(prof => {
            if (prof) {
                const message = `Le prof ${req.params.id} a été bien trouvé`;
                res.staus(200).json({ message, data: prof })
            } else {
                const message = `Le prof ${req.params.id} n'a pas été trouvé`;
                res.json({ message, data: prof })
            }
        }).catch(err => {
            let message = "Le prof n'a pas être trouvé";
            res.status(500).json({ message, data: err })
        })
}

const updateProf = (req, res) => {
    const id = req.params.id;
    Prof.update(req.body, {
        where: { id: id }
    }).then(() => {
        return Prof.findByPk(id).then(prof => {

            if (prof === null) {
                const message = `Le prof demandé n'existe pas`;
                return res.status(404).json({ message, data: prof })
            }

            const message = `Le prof ${id} a été modifié avec succès`;
            res.status(200).json({ message, data: prof })
        })
    }).catch(err => {
        if (err instanceof ValidationError) {
            return res.status(400).json({ message: err.message, data: err })
        }
        let message = "Le prof n'a pas être modifié";
        res.status(500).json({ message, data: err })
    })
}

const deleteProf = (req, res) => {
    Prof.findByPk(req.params.id).then(prof => {

        if (prof === null) {
            const message = `Le prof demandé n'existe pas`;
            return res.status(404).json({ message, data: prof })
        }

        const recoursDeleted = prof;

        return Prof.destroy({
            where: { id: req.params.id }
        }).then(() => {
            const message = `Le prof ${req.params.id} a été bien supprimé`;
            res.json({ message, data: recoursDeleted })
        }).catch(err => {
            let message = "Le prof n'a pas être supprimé";
            res.status(500).json({ message, data: err })
        })
    })
}

module.exports = {
    addProf,
    getAllData,
    getOneProf,
    updateProf,
    deleteProf
}