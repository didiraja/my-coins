# My Coins — guia do projeto

## Visão geral

Aplicação pessoal para acompanhar operações e carteira de criptoativos. O frontend mostra a carteira, preços, saldo, investimento e lucro estimado; o Payload CMS guarda usuários, moedas e operações. A interface está em português do Brasil em parte do código.

## Stack e estrutura

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 e SCSS.
- Payload CMS 3 com adaptador SQLite/Drizzle; configuração em `src/payload.config.ts`.
- `src/app/(frontend)/`: páginas `/`, `/login`, `/dashboard` e `/trades`.
- `src/app/(payload)/`: painel administrativo e rotas de API do Payload.
- `src/collections/`: modelos `Users`, `Coin`, `Trade` e `Wallet`. `Media.ts` existe, mas não está registrado na configuração atual.
- `src/libs/endpoints.ts`: endpoint `GET /api/dashboard`, com agregação da carteira. `src/libs/queries/` contém consultas de saldo e investimento; `src/libs/request.ts` consulta preços na CoinGecko e o endpoint do painel.
- `src/actions/`: ações de login, logout e renovação da sessão. `src/middleware.ts` protege as rotas do frontend usando o cookie `payload-token`.
- `src/components/` e `src/app/globals.css`: componentes e estilos da interface. O alias `@/` aponta para `src/`.

## Fluxo de dados

Uma operação (`Trade`) registra moeda e valor de entrada e saída. O endpoint do painel soma as operações no SQLite, calcula a quantidade mantida por moeda, converte valores com cotações da CoinGecko e devolve `IDashEndpoint` (`src/types/index.ts`). A página `/dashboard` consome esse endpoint; `/trades` lista as operações diretamente pelo Payload.

## Desenvolvimento

1. Instale as dependências com `npm install` (há `package-lock.json`).
2. Configure `.env` a partir de `.env.example`: `DATABASE_URI` aponta para o SQLite e `PAYLOAD_SECRET` é necessário para o Payload e o endpoint do painel. O código também usa `API_TOKEN` para a CoinGecko e `PORT` na URL local do painel (normalmente `3000`). Não versione segredos.
3. Execute `npm run dev`. Use `npm run build` para validar o build e `npx tsc --noEmit` para checar tipos.
4. Após mudar coleções/campos do Payload, confira a necessidade de rodar `npm run generate:types` e `npm run generate:db-schema` e de atualizar os arquivos gerados afetados.

Não há suíte de testes configurada. O script `lint` usa `next lint`; confirme sua compatibilidade com a versão instalada do Next.js antes de adotá-lo como verificação.

## Cuidados ao alterar

- O cálculo do painel em `src/libs/endpoints.ts` usa IDs numéricos de moedas definidos no banco e chaves específicas de cotação. Ao mudar moedas ou dados iniciais, atualize esses mapeamentos e os cálculos juntos.
- Preserve a direção de `coinIn`/`coinOut` e `amountIn`/`amountOut` nas consultas: ela determina compras, vendas e saldo.
- Revise controle de acesso antes de expor novos dados: algumas coleções permitem leitura pública e `Trade` permite criação pública na configuração atual.
- O login atual contém um e-mail fixo e usa `NEXT_PUBLIC_USER_PASS` no cliente. Não amplie esse padrão ao mexer em autenticação; trate credenciais como segredos de servidor.
- `docker-compose.yml` inclui MongoDB, mas a configuração ativa do Payload usa SQLite. Confirme o ambiente desejado antes de alterar infraestrutura.
- Siga o estilo existente (`.prettierrc.json`: aspas simples, sem ponto e vírgula, largura 100). Prefira mudanças localizadas e mantenha os tipos do Payload coerentes com as coleções.
