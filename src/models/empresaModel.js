var database = require('../database/config');

function buscarMetricasPorToken(tokenNode) {
    var instrucaoSql = `
    SELECT DISTINCT
        comp.nome,
        comp.nome_coluna,
        comp.funcao_psutil,
        comp.argumento_nome,
        comp.argumento_valor,
        comp.atributo_retorno,
        comp.indice_retorno,
        comp.unidade
    FROM servidor s
    JOIN empresa e
        ON e.id = s.fk_empresa
    JOIN componente_servidor cs
        ON cs.fk_servidor = s.id
    JOIN componente comp
        ON comp.id = cs.fk_componente

        WHERE s.token_servidor = '${tokenNode}';
    `;

    return database.executar(instrucaoSql);
}

function listarLimites(idEmpresa) {
    var instrucaoSql = `
    SELECT c.nome AS componente, c.unidade, cs.limite_atencao, cs.limite_critico FROM empresa e
    JOIN servidor s ON s.fk_empresa = e.id
    JOIN componente_servidor cs ON cs.fk_servidor = s.id
    JOIN componente c ON c.id = cs.fk_componente WHERE e.id = ${idEmpresa};`

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMetricasPorToken,
    listarLimites
}
