# Documento de Requisitos de Software (DRS) – D-SearchAi

## 1. Identificação e Controle do Documento
* **Nome do Sistema:** D-SearchAi
* **Versão:** 1.0
* **Ano:** 2026
* **Autor:** Equipe de Desenvolvimento – Projeto Acadêmico

## 2. Introdução

### 2.1. Finalidade
Este Documento de Requisitos de Software (DRS) estabelece as especificações técnicas, funcionais e operacionais para o sistema D-SearchAi. Em conformidade com as melhores práticas de Engenharia de Requisitos, este documento atua como uma especificação formal e um contrato entre o cliente (Quinelato) e a equipe de desenvolvimento. O objetivo é consolidar uma base de conhecimento para o desenvolvimento de uma arquitetura de Retrieval-Augmented Generation (RAG) e indexação semântica, garantindo a validação e a integridade do ciclo de vida do software.

### 2.2. Escopo do Sistema
O D-SearchAi é uma solução de Inteligência Artificial Industrial projetada para converter documentos estáticos em ativos dinâmicos de conhecimento. O escopo abrange:
* Organização centralizada de documentos técnicos;
* Busca semântica inteligente de procedimentos via linguagem natural;
* Identificação automatizada de normas técnicas e instrumentos;
* Consulta de atividades operacionais e fluxos industriais;
* Assistente de suporte técnico baseado em IA (LLM-powered assistant).

### 2.3. Definições e Acrônimos
* **AI (IA):** Artificial Intelligence (Inteligência Artificial).
* **NLP (PLN):** Natural Language Processing (Processamento de Linguagem Natural).
* **DRS:** Documento de Requisitos de Software (Contrato de Especificação).
* **Embedding:** Representação vetorial de texto que permite o processamento de contexto semântico pela IA.

## 3. Fundamentos da Engenharia de Requisitos Aplicados

### 3.1. Processo de Elicitação e Análise
O projeto QIA adotou um ciclo de vida rigoroso para garantir a soberania dos dados industriais:
* **Elicitação:** Levantamento de necessidades por meio de entrevistas e workshops estruturados (JAD), além da análise documental exaustiva dos manuais da Quinelato.
* **Análise:** Refinamento técnico para eliminação de ambiguidades e priorização de requisitos críticos para a operação industrial.
* **Especificação:** Documentação rigorosa neste DRS, definindo o comportamento esperado da pipeline de IA.
* **Validação:** Verificação de consistência através de prototipagem de interface e revisões técnicas com os stakeholders.
* **Gerenciamento:** Controle de mudanças e rastreabilidade dos requisitos utilizando RM Tools (Jira, Trello e ClickUp), garantindo que a evolução do sistema esteja alinhada às demandas de qualidade.

### 3.2. Stakeholders e Personas
* **Administrador:** Gestor responsável pela governança da base de conhecimento, gerenciamento de acessos e auditoria de relatórios.
* **Usuário Técnico (Engenheiros, Consultores de Qualidade, Técnicos e Gestores):** Consumidores da informação técnica, responsáveis por realizar buscas complexas e validar os procedimentos extraídos pela IA para suporte em campo.

## 4. Descrição Geral do Produto

### 4.1. Perspectiva e Arquitetura
O sistema é baseado em uma arquitetura de microsserviços com interface Web, estruturada sob o seguinte fluxo de processamento hierárquico:
1. Ingestão de Documentos Técnicos (PDF/DOCX);
2. Pipeline de Processamento de IA (NLP);
3. Extração automatizada de entidades (Normas, Instrumentos, Atividades);
4. Indexação semântica em Banco de Dados Vetorial;
5. Motor de Busca Inteligente (RAG Architecture);
6. Entrega de resultados via Interface do Usuário (Dashboard).

### 4.2. Funções do Produto
O sistema integra seis funções modulares: permite a ingestão de documentos que sofrem uma extração automatizada de metadados críticos (atividades, normas e instrumentos). Através de uma interface intuitiva, o usuário realiza buscas semânticas contextuais, transformando o acervo documental em uma base de consulta ágil e precisa.

### 4.3. Restrições e Suposições
* **Restrições:** Compatibilidade exclusiva com navegadores modernos (Edge, Chrome, Firefox), autenticação mandatória por níveis de acesso e suporte restrito aos formatos PDF e DOCX.
* **Suposições:** Documentos internos da empresa são completamente digitais e possuem um sistema de busca interna para facilitar a busca quando necessário.

## 5. Especificação de Requisitos

### 5.1. Requisitos Funcionais (RF)
* **RF01 - Cadastro de Documentos:** Registro e versionamento de documentos técnicos industriais na base.
* **RF02 - Upload de Arquivos:** Interface para recepção de arquivos nos formatos PDF e DOCX.
* **RF03 - Processamento por IA:** Extração automática de atividades, processos, normas e instrumentos citados através de NLP.
* **RF04 - Busca Inteligente:** Recuperação de informações via linguagem natural (ex: busca por contexto de "inspeção de qualidade").
* **RF05 - Identificação de Normas:** Detecção e indexação automática de referências normativas (RDC 665, ISO, etc.).
* **RF06 - Geração de Relatórios:** Emissão de relatórios consolidados sobre o acervo técnico e conformidade normativa.

### 5.2. Requisitos Não Funcionais (RNF)
* **RNF01 - Desempenho:** O motor de busca deve processar consultas complexas em até 3 segundos.
* **RNF02 - Segurança:** Autenticação robusta com armazenamento de credenciais via hash criptográfico.
* **RNF03 - Usabilidade:** Interface baseada em heurísticas de usabilidade para fácil adoção técnica.
* **RNF04 - Disponibilidade:** SLA mínimo de 99% de disponibilidade durante o horário comercial industrial.
* **RNF05 - Backup:** Rotina de backup automático e incremental executada diariamente.

## 6. Regras de Negócio (RN)
* **RN01 – Classificação Obrigatória:** Todo documento técnico inserido no ecossistema QIA deve ser obrigatoriamente classificado por categoria técnica para garantir a integridade da indexação.
* **RN02 – Responsabilidade por Departamento:** Cada documento deve estar vinculado a um departamento responsável, o qual assume a veracidade e a atualização da informação técnica perante o sistema.
* **RN03 – Associação Automatizada de Normas:** As normas técnicas identificadas pelo motor de IA devem ser vinculadas de forma automática e persistente aos procedimentos que as citam, permitindo o rastreio de conformidade.

## 7. Modelagem de Casos de Uso

### 7.1. Caso de Uso: Buscar Procedimento
* **Ator:** Usuário Técnico.
* **Pré-condição:** Autenticação ativa e perfil de acesso autorizado.
* **Fluxo Principal:**
  1. O usuário acessa a barra de pesquisa semântica.
  2. O usuário insere uma dúvida ou termo em linguagem natural.
  3. O sistema aciona o motor de IA para realizar o match vetorial na base.
  4. O sistema retorna os documentos e trechos específicos que respondem à consulta.
* **Pós-condição:** O usuário obtém a informação técnica necessária para a execução de sua tarefa.
