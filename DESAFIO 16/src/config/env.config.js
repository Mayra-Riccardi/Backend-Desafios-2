const path = require('path');
const dotenv = require('dotenv');

//configuracion del config// NODE_ENV = 'development || production
dotenv.config({
    path: path.resolve(process.cwd(), `${process.env.NODE_ENV || 'development'}.env`)
})

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080,
    SESSION_SECRET: process.env.SESSION_SECRET || '',
    DATA_SOURCE: process.env.DATA_SOURCE || 'MEM', //aca indicamos como va a ser el data source, puede ser mongo, sql, men, file
    DB_PASSWORD: process.env.DB_PASSWORD || '',

}

module.exports = config