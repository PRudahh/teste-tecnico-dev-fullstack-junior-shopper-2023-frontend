# Shopper — Interface de Atualização Massiva de Preços (Frontend)

Esta é a camada de interface do sistema de atualização massiva de preços da Shopper. Construída com ReactJS + TypeScript, permite que o usuário carregue um arquivo CSV com novos preços, valide as regras de negócio e aplique as atualizações — tudo em uma única tela, sem necessidade de autenticação.

> **Este repositório depende do backend rodando localmente.** Consulte o repositório `shopper-backend` e siga o setup antes de iniciar o frontend.

---

## Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- Backend `shopper-backend` rodando em `http://localhost:3001`

---

## Configuração do ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/PRudahh/teste-tecnico-dev-fullstack-junior-shopper-2023-frontend
cd shopper-frontend
```

### 2. Instale as dependências

```bash
npm install
```

> **Windows:** caso receba erro de scripts no PowerShell, troque para o CMD ou rode `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` como Administrador.

### 3. Configure as variáveis de ambiente

```bash
# Windows (CMD)
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

O `.env` padrão aponta para `http://localhost:3001`. Se o backend estiver em outra porta, ajuste:

```env
REACT_APP_API_URL=http://localhost:3001
```

---

## Rodando a aplicação

```bash
npm start
```

O React abre automaticamente `http://localhost:3000` no navegador.

**Importante:** o backend deve estar rodando antes de usar a interface. Abra dois terminais:

```
Terminal 1 → pasta shopper-backend → npm run dev
Terminal 2 → pasta shopper-frontend → npm start
```

---

## Como usar

1. **Selecione o arquivo CSV** clicando na área de upload ou arrastando o arquivo
2. Clique em **VALIDAR** — a tabela exibirá cada produto com seu preço atual, novo preço e status
3. Se houver erros, cada produto mostrará qual regra foi quebrada — corrija o CSV e valide novamente
4. Se todos os produtos estiverem válidos, o botão **ATUALIZAR** ficará ativo — clique para salvar no banco
5. Após a atualização, a tela volta ao estado inicial para um novo arquivo

---

## Formato do CSV esperado

```
product_code,new_price
18,9.50
1000,57.00
```

---

## Regras validadas

| Regra | Descrição |
|-------|-----------|
| Campos obrigatórios | O CSV deve ter as colunas `product_code` e `new_price` |
| Produto existente | O código deve existir no banco de dados |
| Preço acima do custo | O novo preço não pode ser inferior ao custo do produto |
| Limite de reajuste | O novo preço deve estar entre 90% e 110% do preço atual |
| Consistência de packs | Ao reajustar um pack, os componentes também devem estar no arquivo com soma correta |

---

## Estrutura do projeto

```
shopper-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FileUpload.tsx     # Área de upload com drag-and-drop
│   │   ├── ResultsTable.tsx   # Tabela de resultados da validação
│   │   └── StatusBadge.tsx    # Badge de status por produto
│   ├── services/
│   │   └── api.ts             # Comunicação com o backend
│   ├── types/
│   │   └── index.ts           # Tipos TypeScript compartilhados
│   ├── App.tsx                # Componente principal e gerenciamento de estado
│   ├── App.css                # Estilos globais
│   └── index.tsx              # Entry point
├── .env.example
├── DECISOES.md
└── README.md
```

Consulte [`DECISOES.md`](./DECISOES.md) para o detalhamento das decisões técnicas e de interface.
