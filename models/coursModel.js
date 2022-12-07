module.exports = (sequelize, DataTypes) => {
    const Cours = sequelize.define("cours", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Nom est un champ obligatoire' },
                notEmpty: { msg: 'Nom est un champ obligatoire' }
            }
        },
        ponderation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'Cotes est un champ obligatoire' },
                notEmpty: { msg: 'Cotes est un champ obligatoire' },
            }
        },
        coteAnne: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        coteExam: {
            type: DataTypes.INTEGER,
            allowNull: true,        },
        coteRep: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        statut: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    })

    return Cours;
}