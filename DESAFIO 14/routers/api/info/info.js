const express = require('express');
const minimist = require("minimist")
const { fork } = require("child_process");
const os = require("os");
const compression = require("compression");
const {
    consoleLogger,
} = require("../../../logger/logger")




const router = express.Router();

const NUM_WORKERS = os.cpus().length;
const args = minimist(process.argv.slice(2),{
    default: {
        port: 8080,
    },
    alias: {
        p: "port",
    }    
});



//Routes
router.get('/', async (req, res) => {
   /*  consoleLogger.info("peticion a /info, metodo get") */
    console.log("Corriendo en el Puerto: " + args.port,
    "Argumentos de entrada: " + args._,
    "Plataforma: " + process.platform,
    "Version Node: " + process.version,
    "Memoria total reservada: " + process.memoryUsage().rss,
    "Path de ejecucion: " + process.execPath,
    "Process Id: " + process.pid,
    "Carpeta del proyecto: " + process.cwd(),
    "Numero de procesadores: " + NUM_WORKERS)
    res.json({
        "Corriendo en el Puerto": args.port,
        "Argumentos de entrada": args._,
        "Plataforma": process.platform,
        "Version Node": process.version,
        "Memoria total reservada": process.memoryUsage().rss,
        "Path de ejecucion": process.execPath,
        "Process Id": process.pid,
        "Carpeta del proyecto": process.cwd(),
        "Numero de procesadores": NUM_WORKERS,
    });
});

router.get('/infozip', compression(), async (req, res) => {
    consoleLogger.info("peticion a /info/infozip, metodo get")
    res.json({
        "Corriendo en el Puerto": args.port,
        "Argumentos de entrada": args._,
        "Plataforma": process.platform,
        "Version Node": process.version,
        "Memoria total reservada": process.memoryUsage().rss,
        "Path de ejecucion": process.execPath,
        "Process Id": process.pid,
        "Carpeta del proyecto": process.cwd(),
        "Numero de procesadores": NUM_WORKERS,
    });
});


router.get('/random', async (req, res) => {
    consoleLogger.info("peticion a /info/random, metodo get")
    const { qty } = req.query
    const computo = fork("./fork/computo.js")
    computo.send(qty || 100000000);
    computo.on("message", (data) => {
        res.json({
            resultado: data
        });
    });
});









module.exports = router;