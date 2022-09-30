// tudo que envolve o banc, sera via sequelize, usar banco relacionais com node
const Sequelize = require('sequelize')

const sequelize = new Sequelize({//ira criar um banco de dado, dentro dessa pasta './db/app.db'
    dialect: 'sqlite',
    storage: './db/app.db'
})

//como esse arquivo é externo devemos exporta

module.exports = sequelize