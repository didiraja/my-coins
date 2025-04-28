# All invested in BTC
`SELECT coin_in_id, sum(amount_in) as sum_coin FROM trade where coin_out_id = '1' group by coin_in_id`

# All withdrawed in BTC
`SELECT coin_out_id, sum(amount_out) as sum_coin
  FROM trade
  INNER JOIN coin ON trade.coin_out_id = coin.id
  where coin_in_id = '1' group by coin_out_id;`

# All invested Net in BTC (detailed; all coins)
`SELECT 
  coin.coin AS coin_name,
  SUM(CASE WHEN trade.coin_out_id = '1' THEN trade.amount_in ELSE 0 END) AS total_invested,
  SUM(CASE WHEN trade.coin_in_id = '1' THEN trade.amount_out ELSE 0 END) AS total_withdrawn,
  (
    SUM(CASE WHEN trade.coin_out_id = '1' THEN trade.amount_in ELSE 0 END) -
    SUM(CASE WHEN trade.coin_in_id = '1' THEN trade.amount_out ELSE 0 END)
  ) AS net_investment
FROM trade
INNER JOIN coin 
  ON coin.id = CASE 
    WHEN trade.coin_out_id = '1' THEN trade.coin_in_id 
    WHEN trade.coin_in_id = '1' THEN trade.coin_out_id 
  END
WHERE trade.coin_out_id = '1' OR trade.coin_in_id = '1'
GROUP BY coin.coin
HAVING net_investment != 0
ORDER BY net_investment DESC;`