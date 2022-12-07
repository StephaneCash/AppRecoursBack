module.exports = (sequelize, DataTypes) => {
    const Recours = sequelize.define("recours", {
        nomEtudiant: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Nom étudiant est un champ obligatoire' },
                notEmpty: { msg: 'Nom étudiant est un champ obligatoire' }
            }
        },
        postnomEtudiant: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Postnom étudiant est un champ obligatoire' },
                notEmpty: { msg: 'Postnom étudiant est un champ obligatoire' }
            }
        },
        promotion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Promotion étudiant est un champ obligatoire' },
                notEmpty: { msg: 'Promotion étudiant est un champ obligatoire' }
            }
        },
        objetRecours: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'ObjetRecours est un champ obligatoire' },
                notEmpty: { msg: 'ObjetRecours est un champ obligatoire' }
            }
        },
        coteExamen: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'coteExamen étudiant est un champ obligatoire' },
                notEmpty: { msg: 'coteExamen étudiant est un champ obligatoire' }
            }
        },
        coteAnnee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'coteAnnee est un champ obligatoire' },
                notEmpty: { msg: 'coteAnnee est un champ obligatoire' }
            }
        },
        nomCompletProf: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'NomProf est un champ obligatoire' },
                notEmpty: { msg: 'NomProf est un champ obligatoire' }
            }
        },
        cours: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Cours est un champ obligatoire' },
                notEmpty: { msg: 'Cours est un champ obligatoire' }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        statut: {
            type: DataTypes.INTEGER
        },
        ponderationCours: {
            type: DataTypes.INTEGER
        },
        coteAnneeRepondu: {
            type: DataTypes.INTEGER
        },
        coteExamRepondu: {
            type: DataTypes.INTEGER
        }
    });

    return Recours;
}