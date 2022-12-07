const db = require('../models');
const { ValidationError } = require('sequelize');

const Filiere = db.filieres;

const addFiliere = (req, res) => {
    Filiere.create(req.body)
        .then(response => {
            const msg = `Filière créée avec succès`;
            res.status(201).json({ msg, data: response })
        })
        .catch(err => {
            return res.status(500).json({ err: err });
        })
};

const getAllFilieres = (req, res) => {
    Filiere.findAll()
        .then(resp => {
            let taille = resp.length;
            res.status(200).json({ message: 'La liste de filières a été bien trouvée', taille: taille, data: resp, });
        })
        .catch(err => {
            return res.status(500).json(err)
        });
};

const getOneFiliere = (req, res) => {
    Filiere.findByPk(req.params.id)
        .then(filiere => {
            if (filiere) {
                const message = `La filière ${req.params.id} a été bien trouvée`;
                res.json({ message, data: filiere })
            } else {
                const message = `La filière ${req.params.id} n'a pas été trouvée`;
                res.json({ message, data: filiere })
            }
        }).catch(err => {
            let message = "La filière n'a pas être trouvée";
            res.status(500).json({ message, data: err })
        })
}

const updateFiliere = (req, res) => {
    const id = req.params.id;
    Filiere.update(req.body, {
        where: { id: id }
    }).then(() => {
        return Filiere.findByPk(id).then(filiere => {

            if (filiere === null) {
                const message = `La filière demandée n'existe pas`;
                return res.status(404).json({ message, data: filiere })
            }

            const message = `La filière ${id} a été modifié avec succès`;
            res.status(200).json({ message, data: filiere })
        })
    }).catch(err => {
        if (err instanceof ValidationError) {
            return res.status(400).json({ message: err.message, data: err })
        }
        let message = "La filière n'a pas être modifiée";
        res.status(500).json({ message, data: err })
    })
}

const deleteFiliere = (req, res) => {
    Filiere.findByPk(req.params.id).then(filiere => {

        if (filiere === null) {
            const message = `La filière demandée n'existe pas`;
            return res.status(404).json({ message, data: filiere })
        }

        const filiereDeleted = filiere;

        return Filiere.destroy({
            where: { id: req.params.id }
        }).then(() => {
            const message = `La filière ${req.params.id} a été bien supprimée`;
            res.json({ message, data: filiereDeleted })
        }).catch(err => {
            let message = "La filière n'a pas être supprimée";
            res.status(500).json({ message, data: err })
        })
    })
}

module.exports = {
    addFiliere,
    getAllFilieres,
    getOneFiliere,
    updateFiliere,
    deleteFiliere
}