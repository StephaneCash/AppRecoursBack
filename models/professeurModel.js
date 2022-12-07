module.exports = (sequelize, DataTypes) => {
    const Prof = sequelize.define("professeurs", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Nom est un champ obligatoire' },
                notEmpty: { msg: 'Nom est un champ obligatoire' }
            }
        },
        postnom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Postnom est un champ obligatoire' },
                notEmpty: { msg: 'Postnom est un champ obligatoire' },
            }
        },
        statut: {
            type: DataTypes.INTEGER
        }
    })

    return Prof;
}