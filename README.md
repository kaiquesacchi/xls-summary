# xls-summary

## About

Allows the user to:

- Import statement spreadsheets from Insurance Companies and normalize the data;
- Export policy registries as a single spreadsheet file;
- Import consultants' data to link to the policies;

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

### TODO

- [ ] Importar planilhas das empresas
  - [ ] Reconhecer colunas automaticamente
    - [ ] Corrigir Mag
    - [ ] Corrigir Prudential
    - ~~[ ] Unimed~~ `Ainda não temos uma confiável`
  - [ ] Azos (comissões)
    - [ ] Na planilha de comissões, lidar com valores negativos `linha 12467`
      - [ ] Decidir o que fazer com os valores negativos
      - [ ] Eles vem com o valor total zerado, lidar com isso
  - [ ] Azos (bônus)
  - [ ] Icatu
    - [ ] Lidar com comissão negativa
  - [ ] Mag
  - [ ] Omint
  - [ ] Prudential
  - [ ] Unimed

- [ ] Adicionar campo para "tipo de transação"
  - [ ] Extrair esse campo da planilha, quando possível
  - [ ] Adicionar select global (junto ao nome da empresa) pré-import

- [ ] Tracking da planilha importada
  - [ ] Adicionar uma nova tabela para imports
  - [ ] Adicionar referência em todas as outras tabelas

- [ ] Evitar duplicação de registros
  - [ ] Criar identificador multi-coluna para unicidade dos registros

- [ ] Importar da planilha de especialistas

### Problemas no reconhecimento automático das planilhas:

| Seguradora  | Chave                   | Inferida como | Deveria ser    |
| ----------- | ----------------------- | ------------- | -------------- |
| Mag         | products                | Produtor      | DG             |
| Mag         | paymentTimestamp        | Fato          | Pagto          |
| Prudential  | commissionPercentage    | -             | % Comissão     |
| Prudential  | paymentTotalCommission  | % Comissão    | Comissão Total |
