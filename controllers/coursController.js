const db = require('../models');
const { ValidationError } = require('sequelize');

const Cours = db.cours;

const addRecours = (req, res) => {
    Cours.create(req.body)
        .then(response => {
            const msg = `Cours créé avec succès`;
            res.status(201).json({ msg, data: response })
        })
        .catch(err => {
            return res.status(500).json({ err: err });
        })
};

const getAllRecours = (req, res) => {
    Cours.findAll()
        .then(resp => {
            let taille = resp.length;
            res.status(200).json({ message: 'La liste de cours a été bien trouvée', taille: taille, data: resp, });
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}

const getOneRecours = (req, res) => {
    Cours.findByPk(req.params.id)
        .then(recours => {
            if (recours) {
                const message = `Le cours ${req.params.id} a été bien trouvé`;
                res.json({ message, data: recours })
            } else {
                const message = `Le cours ${req.params.id} n'a pas été trouvé`;
                res.json({ message, data: recours })
            }
        }).catch(err => {
            let message = "Le cours n'a pas être trouvé";
            res.status(500).json({ message, data: err })
        })
}

const updateRecours = (req, res) => {
    const id = req.params.id;
    Cours.update(req.body, {
        where: { id: id }
    }).then(() => {
        return Cours.findByPk(id).then(cours => {

            if (cours === null) {
                const message = `Le cours demandé n'existe pas`;
                return res.status(404).json({ message, data: cours })
            }

            const message = `Le cours ${id} a été modifié avec succès`;
            res.status(200).json({ message, data: cours })
        })
    }).catch(err => {
        if (err instanceof ValidationError) {
            return res.status(400).json({ message: err.message, data: err })
        }
        let message = "Le cours n'a pas être modifié";
        res.status(500).json({ message, data: err })
    })
}

const deleteRecours = (req, res) => {
    Cours.findByPk(req.params.id).then(recours => {

        if (recours === null) {
            const message = `Le cours demandé n'existe pas`;
            return res.status(404).json({ message, data: recours })
        }

        const recoursDeleted = recours;

        return Cours.destroy({
            where: { id: req.params.id }
        }).then(() => {
            const message = `Le cours ${req.params.id} a été bien supprimé`;
            res.json({ message, data: recoursDeleted })
        }).catch(err => {
            let message = "Le cours n'a pas être supprimé";
            res.status(500).json({ message, data: err })
        })
    })
}

module.exports = {
    addRecours,
    getAllRecours,
    getOneRecours,
    updateRecours,
    deleteRecours
}