module.exports = (sequelize, DataTypes) => {
    const Filiere = sequelize.define("filieres", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Nom filière est un champ obligatoire' },
                notEmpty: { msg: 'Nom filière est un champ obligatoire' }
            }
        },
        niveau: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Niveau est un champ obligatoire' },
                notEmpty: { msg: 'Niveau est un champ obligatoire' }
            }
        },
        statut: {
            type: DataTypes.INTEGER
        }
    })

    return Filiere;
}