/*
SELECT
    'Total Saída' AS tipo_movimento,
    c.coin AS nome_moeda, -- Coluna 'coin' da tabela 'coin' agora é o nome
    SUM(t.amount_out) AS valor
FROM
    trade AS t
INNER JOIN
    coin AS c ON t.coin_out_id = c.id -- 'c.id' é o novo nome da coluna ID na tabela 'coin'
WHERE
    t.coin_out_id = '10'

UNION ALL

SELECT
    'Total Entrada' AS tipo_movimento,
    c.coin AS nome_moeda, -- Coluna 'coin' da tabela 'coin' agora é o nome
    SUM(t.amount_in) AS valor
FROM
    trade AS t
INNER JOIN
    coin AS c ON t.coin_in_id = c.id -- 'c.id' é o novo nome da coluna ID na tabela 'coin'
WHERE
    t.coin_in_id = '10'

UNION ALL

SELECT
    'Resultado Líquido' AS tipo_movimento,
    '' AS nome_moeda, -- Não há uma moeda específica para o resultado líquido
    (SELECT SUM(amount_in) FROM trade WHERE coin_in_id = '10') -
    (SELECT SUM(amount_out) FROM trade WHERE coin_out_id = '10') AS valor;

*/ 
