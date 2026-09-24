var empresaModel = require("../models/empresaModel");

async function buscarMetricasPorToken(req, res) {
    try {
        const authorization = req.headers.authorization;

        if (authorization == undefined) {
            return res.status(401).json({
                status: "error",
                message: "Token não informado"
            });
        }

        const tokenNode = authorization.split(" ")[1];

        if (tokenNode == undefined) {
            return res.status(401).json({
                status: "error",
                message: "Token inválido"
            });
        }

        const response = await empresaModel.buscarMetricasPorToken(tokenNode);

        res.status(200).json(response);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: "error",
            message: "Ocorreu um erro interno"
        });
    }
}

async function listarLimites(req, res) {
    try {
        const idEmpresa = req.params.idEmpresa;
        const response = await empresaModel.listarLimites(idEmpresa);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: 'error',
            message: 'Ocorreu um erro interno'
        })
    }
}

module.exports = {
    buscarMetricasPorToken,
    listarLimites
}
