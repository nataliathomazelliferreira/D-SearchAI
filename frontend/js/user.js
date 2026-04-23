// js/user.js

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resultsArea = document.getElementById('resultsArea');
    const typingIndicator = document.getElementById('typingIndicator');
    const aiResponseText = document.getElementById('aiResponseText');
    const sourcesList = document.getElementById('sourcesList');

    // Mock RAG Database
    const mockDatabase = [
        {
            keywords: ['rdc', '665', 'auditoria', 'inspeção', 'qualidade'],
            answer: "De acordo com o **POP-Qualidade-01** (alinhado à norma **RDC 665**), a auditoria de qualidade deve seguir três etapas rigorosas:\n<br><br>1. **Inspeção de Recebimento:** Verificar documentação e integridade física.\n2. **Amostragem:** Retirar lotes conforme tabela militar padrão.\n3. **Relatório de Conformidade:** Emitir laudo técnico no sistema ERP antes da liberação para produção.\n<br>Qualquer desvio deve ser registrado como 'Não Conformidade'.",
            sources: [
                {
                    title: "📄 POP-Qualidade-01.pdf",
                    dept: "Qualidade",
                    excerpt: "...a liberação do lote de insumos críticos está estritamente condicionada à emissão do laudo técnico, conforme exigência do Art. 14 da RDC 665..."
                },
                {
                    title: "📘 Manual_Operacoes_2026.docx",
                    dept: "Operações",
                    excerpt: "...em caso de desvios durante a amostragem, o operador deve bloquear o lote fisicamente e acionar o departamento de Qualidade..."
                }
            ]
        },
        {
            keywords: ['default'],
            answer: "Baseado nos documentos indexados, a política geral da empresa prioriza a segurança operacional e a rastreabilidade total. No entanto, não encontrei um procedimento específico para essa requisição exata nos manuais atuais. Sugiro consultar o departamento de Engenharia para atualização da documentação.",
            sources: [
                {
                    title: "📄 Politica_Geral_2026.pdf",
                    dept: "Diretoria",
                    excerpt: "...toda operação não mapeada nos POPs vigentes deve ser paralisada e reportada à Engenharia e Segurança do Trabalho..."
                }
            ]
        }
    ];

    function typeWriter(element, text, speed = 15) {
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                // Handle basic HTML tags parsing (like <br> or <b>) for mock display
                if (text.substring(i, i+4) === '<br>') {
                    element.innerHTML += '<br>';
                    i += 4;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        // Reset UI
        resultsArea.style.display = 'none';
        typingIndicator.style.display = 'flex';
        
        // Simulate Network & Vector Search Delay
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            resultsArea.style.display = 'grid';

            // Find best match
            let match = mockDatabase.find(db => db.keywords.some(kw => query.includes(kw)));
            if (!match) match = mockDatabase.find(db => db.keywords.includes('default'));

            // Render Sources
            sourcesList.innerHTML = match.sources.map(src => `
                <div class="source-card">
                    <div class="source-title">
                        ${src.title}
                        <span class="badge badge-warning" style="font-size: 0.6rem;">${src.dept}</span>
                    </div>
                    <div class="source-excerpt">
                        "${src.excerpt}"
                    </div>
                </div>
            `).join('');

            // Type AI Answer
            typeWriter(aiResponseText, match.answer);

        }, 1500);
    });
});
