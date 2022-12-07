const db = require('../models');

const Recours = db.recours;

const getAllRecours = (req, res) => {
    Recours.findAll()
        .then(resp => {
            let taille = resp.length;
            if (taille > 0) {
                res.status(200).json({ message: `La liste de recours a été bien trouvée`, data: resp, taille });
            } else {
                return res.status(404).json({ message: `Aucune donnée trouvée dans la table recours`, data: resp, taille });
            }
        })
        .catch(err => {
            return res.status(500).json({ err });
        });
};

const addRecours = (req, res) => {

    const statut = 0;
    const { nomEtudiant, postnomEtudiant, promotion, objetRecours, coteExamen,
        coteAnnee, nomCompletProf, cours, ponderationCours, coteAnneeRepondu,
        coteExamRepondu } = req.body;

    Recours.create({
        nomEtudiant, postnomEtudiant, promotion, objetRecours, coteAnnee, coteExamen,
        nomCompletProf, cours, statut, ponderationCours, coteAnneeRepondu, coteExamRepondu,
    })
        .then(response => {
            res.status(201).json({ message: `Recours créé avec succès`, data: response });
        })
        .catch(err => {
            for (let i = 0; i < err.errors.length; i++) {
                const errors = err.errors[i].message;
                return res.status(500).json({ errors });
            }
        });

    /*console.log("FICHIER ENVOYE ::: " + req.files + " BODY :::: " + req.body)

    if (!req.files) {

       
    } else {
        let file = req.files.file;

        const mime_types = {
            "image/jpg": "jpg",
            "image/png": "png",
            "image/jpeg": "jpg",
            "image/gif": "gif"
        };
        const extension = mime_types[file.mimetype];

        if (extension) {
            file.mv("../AppFront/public/images/" + file.name);
            Recours.create({
                nomEtudiant, postnomEtudiant, promotion, objetRecours, coteAnnee, coteExamen,
                nomCompletProf, cours, statut, ponderationCours, coteAnneeRepondu, coteExamRepondu,
                image: "./images/" + file.name
            })
                .then(response => {
                    res.status(201).json({ message: `Recours créé avec succès`, data: response });
                })
                .catch(err => {
                    for (let i = 0; i < err.errors.length; i++) {
                        const errors = err.errors[i].message;
                        return res.status(500).json({ errors });
                    }
                });
        } else {
            return res.status(400).json({ message: "Mauvais format, seuls autorisés : png, gif, jpeg, jpg" });
        }
    }*/

};

const updateRecours = (req, res) => {
    let id = req.params.id;
    const { nomEtudiant, postnomEtudiant, promotion, objetRecours, coteExamen, coteAnnee, nomCompletProf, cours, statut, ponderationCours, coteAnneeRepondu, coteExamRepondu } = req.body;

    Recours.findOne({ where: { id: id } })
        .then(recours => {
            if (recours === null) {
                return res.status(404).json({ message: `Le recours à modifier n'existe pas` });
            }

            Recours.update({
                nomEtudiant, postnomEtudiant, promotion, objetRecours, coteAnnee, coteExamen, nomCompletProf, cours, statut, ponderationCours, coteAnneeRepondu, coteExamRepondu
            }
                , { where: { id: id } }
            )
                .then(response => {
                    if (response) {
                        Recours.findOne({ where: { id: id } })
                            .then(resp => {
                                res.status(200).json({ message: `Le recours ${id} a été bien modifié`, data: resp });
                            })
                            .catch(err => {
                                return res.status(500).json({ err });
                            })
                    }
                })
                .catch(err => {
                    return res.status(500).json({ err });
                });
        })
        .catch(err => {
            return res.status(500).json({ err });
        });
};

const getOneRecours = (req, res) => {
    let id = req.params.id;
    Recours.findOne({ where: { id: id } })
        .then(resp => {
            if (resp === null) {
                return res.status(404).json({ message: `Le recours demandé n'existe pas` })
            }

            res.status(200).json({ message: `Le recours a été trouvé avec succès`, data: resp })
        })
        .catch(err => {
            return res.status(500).json({ err });
        });
};

const deleteRecours = (req, res) => {
    let id = req.params.id;
    Recours.findOne({ where: { id: id } })
        .then(resp => {
            if (resp === null) {
                return res.status(404).json({ message: `Le recours à supprimer n'existe pas` })
            }

            Recours.destroy({ where: { id: id } })
                .then(response => {
                    res.status(200).json({ message: `Le recours a été supprimé avec succès`, data: resp })
                })
                .catch(err => {
                    return res.status(500).json({ err });
                });
        })
        .catch(err => {
            return res.status(500).json({ err });
        });
}

module.exports = {
    getAllRecours,
    addRecours,
    updateRecours,
    getOneRecours,
    deleteRecours
};