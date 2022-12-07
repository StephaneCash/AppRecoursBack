const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Connexion successful à la DB');
    })
    .catch((err) => {
        console.log("Erreur de connexion à la DB : ", err)
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel.js')(sequelize, DataTypes);
db.cours = require('./coursModel.js')(sequelize, DataTypes);
db.profs = require('./professeurModel.js')(sequelize, DataTypes);
db.filieres = require('./filiereModel.js')(sequelize, DataTypes);
db.recours = require('./recoursModel.js')(sequelize, DataTypes);

// RELATION 1-N cours/Prof
db.profs.hasMany(db.cours, {
    as: 'cours'
});

db.cours.belongsTo(db.profs, {
    foreignKey: 'professeurId',
    as: 'profs'
});

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Models synchronisés avec succès');
    }).catch(err => {
        console.log('Erreur de synchronisation de models : ', err);
    })

module.exports = db;