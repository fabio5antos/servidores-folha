# Sistema de Servidores / Folha de Pagamentos

Sistema web desenvolvido em Next.js para visualização e exportação de dados de folhas de pagamento de servidores.

## 🚀 Funcionalidades

### 1. Interface Adaptativa
- Suporte a tema claro e escuro
- Design responsivo para diferentes tamanhos de tela
- Transições suaves entre temas e interações

### 2. Visualização de Dados
- Tabela principal com dados dos servidores
- Colunas organizadas: Nome, Cargo, Vínculo, Competência, Carga Horária, Valor Bruto e Valor Líquido
- Ordenação por qualquer coluna da tabela
- Paginação dos resultados

### 3. Filtros Avançados
- Pesquisa por Nome (busca em tempo real)
- Seleção de Cargo com autocompleção
- Filtro por Vínculo
- Filtro por Lotação
- Seletor de Competência (mês/ano)
- Filtros combinados funcionando simultaneamente

### 4. Modal de Detalhes
- Visualização detalhada dos dados do servidor
- Informações organizadas em 3 colunas
- Campos em modo somente leitura
- Dados pessoais com tratamento LGPD (CPF mascarado)
- Campos formatados (datas, valores monetários, etc.)

### 5. Exportação de Dados
#### 5.1. Exportação da Tabela Principal
- Exportação para CSV
- Exportação para XLSX (Excel)
- Exportação para TXT
- Exportação para PDF
- Exportação para JSON
- Função de Impressão

#### 5.2. Exportação de Servidor Individual
- Exportação dos detalhes para CSV
- Exportação dos detalhes para XLSX
- Exportação dos detalhes para TXT
- Exportação dos detalhes para PDF
- Exportação dos detalhes para JSON
- Função de Impressão individual

### 6. Campos Disponíveis
- Nome do Servidor
- CPF (mascarado)
- Matrícula
- Cargo
- Função
- Vínculo
- Lotação
- Forma de Contratação
- Carga Horária
- Data de Admissão
- Data de Exoneração
- Valor Bruto
- Proventos Adicionais
- Descontos
- Valor Líquido
- Competência

### 7. Formatação de Dados
- Valores monetários em Real (R$)
- Datas no formato DD/MM/YYYY
- CPF com máscara de privacidade
- Carga horária com sufixo 'h'

### 8. Tratamento de Erros
- Mensagens de erro amigáveis
- Indicador de carregamento
- Feedback visual para ações do usuário
- Tratamento de dados ausentes

### 9. Performance
- Carregamento dinâmico de dados
- Filtros otimizados em tempo real
- Paginação eficiente
- Transições suaves

## 🛠️ Tecnologias Utilizadas

- Next.js 13+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- Headless UI
- Heroicons
- TanStack Table (React Table)
- XLSX
- jsPDF
- FileSaver

## 📦 Bibliotecas de Exportação

- `xlsx`: Exportação para Excel
- `jspdf`: Geração de PDFs
- `jspdf-autotable`: Tabelas em PDF
- `file-saver`: Download de arquivos

## 🔒 Segurança

- Mascaramento de dados sensíveis (CPF)
- Validação de dados
- Tratamento de erros
- Sanitização de inputs

## 🎨 Design

- Interface limpa e moderna
- Cores consistentes
- Ícones intuitivos
- Feedback visual
- Responsividade
- Acessibilidade

## 💻 Requisitos do Sistema

- Node.js 16+
- NPM ou Yarn
- Navegador moderno com suporte a ES6+

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências: `npm install` ou `yarn`
3. Execute o servidor de desenvolvimento: `npm run dev` ou `yarn dev`
4. Acesse `http://localhost:3000`

## 📄 Licença

Este projeto está sob a licença MIT.
