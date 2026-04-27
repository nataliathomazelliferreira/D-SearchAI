# D-SearchAI

Sistema de Inteligência Artificial para Governança Documental e Busca Semântica em Documentos Industriais.

## Descrição

O D-SearchAI é uma solução MVP (Minimum Viable Product) que combina processamento de linguagem natural e busca vetorial para permitir consultas semânticas em bases documentais industriais. O sistema prioriza a soberania de dados, processando documentos localmente sem depender de provedores externos de IA.

## Funcionalidades

- **Upload e Indexação Local**: Upload de documentos PDF/DOCX com processamento simulado de IA.
- **Busca Semântica**: Consultas em linguagem natural com resultados baseados em similaridade vetorial.
- **Interface Web Moderna**: Frontend responsivo com autenticação mock e navegação intuitiva.
- **API REST**: Backend em FastAPI com endpoints para upload e busca.
- **Soberania de Dados**: Todos os dados permanecem locais, sem transmissão para serviços externos.

## Pré-requisitos

- **Python 3.8+** instalado
- **Pip** (gerenciador de pacotes Python)
- Navegador web moderno (Chrome, Firefox, Edge)

## Instalação

1. **Clone ou baixe o repositório**:
   ```
   git clone <url-do-repositorio>
   cd D-SearchAI-frontend-backend-
   ```

2. **Instale as dependências**:
   ```
   pip install -r backend/requirements.txt
   ```

   Isso instalará:
   - FastAPI (framework web)
   - Uvicorn (servidor ASGI)
   - Python-multipart (para uploads de arquivos)
   - Outras dependências necessárias

## Execução

### Backend (API)

1. Navegue para a pasta do backend:
   ```
   cd backend
   ```

2. Execute o servidor:
   ```
   python -m uvicorn main:app --reload
   ```

   - O servidor iniciará em `http://127.0.0.1:8000`
   - `--reload` permite recarregamento automático em mudanças no código

### Frontend (Interface Web)

1. Abra um navegador web
2. Navegue para `frontend/index.html`:
   - Clique com o botão direito no arquivo no VS Code e selecione "Open with Live Server"
   - Ou arraste o arquivo diretamente para a janela do navegador
   - URL típica: `file:///caminho/para/frontend/index.html`

3. Na página de login:
   - Selecione "Administrador" para upload de documentos
   - Selecione "Usuário Técnico" para realizar buscas

## Uso

### Como Administrador
- Faça login como administrador (senha mock: "admin123")
- Faça upload de documentos PDF/DOCX
- Visualize o status de processamento

### Como Usuário
- Faça login como usuário técnico
- Digite consultas em linguagem natural (ex.: "Qual o procedimento para auditoria da RDC 665?")
- Visualize respostas sintetizadas e fontes consultadas

## Estrutura do Projeto

```
D-SearchAI-frontend-backend-/
├── backend/
│   ├── main.py              # API FastAPI
│   ├── requirements.txt     # Dependências Python
│   └── data/docs/           # Armazenamento local de documentos
├── frontend/
│   ├── index.html           # Página de login
│   ├── admin.html           # Painel administrativo
│   ├── user.html            # Interface de busca
│   ├── css/
│   │   └── styles.css       # Estilos globais
│   └── js/
│       ├── app.js           # Sistema de autenticação
│       ├── admin.js         # Lógica do admin
│       └── user.js          # Lógica de busca
├── docs/
│   └── DRS.md               # Documento de Requisitos do Sistema
└── README.md                # Este arquivo
```

## Tecnologias Utilizadas

- **Backend**: Python, FastAPI, Uvicorn
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Processamento**: Simulação de IA (LangChain/LlamaIndex futuro)
- **Armazenamento Vetorial**: ChromaDB (planejado)
- **UI/UX**: Design system moderno com glassmorphism

## Desenvolvimento Futuro

- Integração real com LangChain e LlamaIndex
- Implementação de ChromaDB para indexação vetorial
- Autenticação JWT
- Suporte a mais formatos de documento
- Dashboard de métricas

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto é propriedade intelectual da organização. Consulte os termos internos para uso e distribuição.

## Suporte

Para dúvidas ou problemas:
- Verifique os logs do terminal para erros
- Certifique-se de que a porta 8000 não está em uso
- Teste a API diretamente em `http://127.0.0.1:8000/docs` (documentação automática do FastAPI)