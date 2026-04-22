# Decisões Técnicas — Shopper Frontend

## Contexto

Este repositório contém a interface gráfica do sistema de atualização massiva de preços da Shopper. O frontend foi construído com ReactJS + TypeScript e se comunica exclusivamente com a API do backend via HTTP. Seu objetivo é oferecer ao usuário do time de Compras uma ferramenta simples para carregar um arquivo CSV, validar os preços e aplicar as atualizações com segurança.

---

## Regras de negócio refletidas na interface

A interface foi desenhada para tornar as regras de negócio visíveis e claras para o usuário:

- **Validação explícita antes da atualização:** o botão ATUALIZAR só fica habilitado após o clique em VALIDAR e somente se nenhum produto apresentar erros. Isso impede que o usuário atualize preços sem revisar os resultados.
- **Erros visíveis por produto:** cada linha da tabela exibe exatamente qual regra foi quebrada (preço abaixo do custo, reajuste fora do limite, inconsistência de pack). O usuário sabe o que corrigir no arquivo antes de tentar novamente.
- **Reset automático após atualização:** após um ATUALIZAR bem-sucedido, a tela volta ao estado inicial, pronta para receber um novo arquivo — conforme solicitado nos requisitos.
- **Re-validação no backend:** ao clicar em ATUALIZAR, o backend re-executa todas as validações antes de salvar. A interface reflete esse comportamento exibindo erros caso ocorram.

---

## Decisões Técnicas

### Por que uma única página (sem rotas)?
O requisito descreve um fluxo linear: carregar arquivo → validar → atualizar. Não há necessidade de múltiplas telas. Uma única página mantém o código simples e a experiência direta.

### Por que Create React App e não Vite?
Create React App é o ponto de entrada padrão para projetos React com TypeScript, amplamente documentado e sem necessidade de configuração adicional. Para o escopo deste projeto, suas limitações de performance não são relevantes.

### Por que os componentes foram separados?
Cada componente tem uma responsabilidade única: `FileUpload` cuida da seleção de arquivo, `ResultsTable` exibe os dados, `StatusBadge` renderiza o status de cada produto. Isso facilita a leitura, o teste e a manutenção independente de cada parte.

### Por que o estado vive no App.tsx e não em cada componente?
O fluxo da aplicação (arquivo selecionado → validado → atualizado) é linear e compartilhado por múltiplos componentes. Centralizar o estado no `App.tsx` evita prop drilling desnecessário e torna o fluxo fácil de seguir.

### Por que a variável REACT_APP_API_URL?
O endereço do backend fica em `.env` para que a troca de ambiente (local → produção) não exija mudanças no código — apenas na configuração. O prefixo `REACT_APP_` é obrigatório para que o Create React App exponha a variável ao bundle.

### Por que drag-and-drop na área de upload?
É um comportamento esperado em ferramentas modernas de upload e não adiciona dependências externas — foi implementado com os eventos nativos do React (`onDrop`, `onDragOver`).

### Sobre responsividade
A interface se adapta a telas menores via media queries: em telas abaixo de 640px, os botões ocupam largura total e a tabela rola horizontalmente. Isso garante usabilidade em tablets sem comprometer a experiência no desktop, que é o ambiente principal da ferramenta.
