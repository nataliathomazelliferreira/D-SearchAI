// js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadForm = document.getElementById('uploadForm');
    const documentsTable = document.getElementById('documentsTable');
    
    // Mock Data
    let documents = [
        { name: 'POP-Qualidade-01.pdf', dept: 'Qualidade', tags: ['ISO 9001', 'Inspeção'], status: 'Indexado' },
        { name: 'Manual_Operacoes_2026.docx', dept: 'Operações', tags: ['RDC 665', 'Segurança'], status: 'Indexado' }
    ];

    function renderTable() {
        documentsTable.innerHTML = '';
        documents.forEach(doc => {
            const tagsHTML = doc.tags.map(tag => `<span class="badge badge-ai" style="margin-right: 4px;">${tag}</span>`).join('');
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 500;">${doc.name}</td>
                <td>${doc.dept}</td>
                <td>${tagsHTML}</td>
                <td><span class="badge ${doc.status === 'Indexado' ? 'badge-success' : 'badge-warning'}">${doc.status}</span></td>
            `;
            documentsTable.appendChild(tr);
        });
        
        document.getElementById('stat-docs').innerText = documents.length + 10; // mock total
    }

    renderTable();

    // Drag & Drop Handlers
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            dropZone.querySelector('p').innerText = fileInput.files[0].name;
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            dropZone.querySelector('p').innerText = fileInput.files[0].name;
        }
    });

    // Form Submit Simulation
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!fileInput.files.length) {
            alert('Por favor, selecione um arquivo.');
            return;
        }

        const file = fileInput.files[0];
        const dept = document.getElementById('dept').value;
        const category = document.getElementById('category').value;
        const submitBtn = uploadForm.querySelector('button');
        const progressDiv = document.getElementById('uploadProgress');
        const progressBar = document.getElementById('progressBar');
        const progressPercent = document.getElementById('progressPercent');
        const progressText = document.getElementById('progressText');

        // UI Feedback
        submitBtn.disabled = true;
        progressDiv.style.display = 'block';
        
        // Simulating Backend Upload & Local AI processing
        progressText.innerText = 'Fazendo upload para servidor local...';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 50 && progressText.innerText.includes('upload')) {
                progressText.innerText = 'Extraindo entidades e gerando embeddings...';
            }
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Add to mock table
                setTimeout(() => {
                    documents.unshift({
                        name: file.name,
                        dept: dept,
                        tags: [category, 'Auto-Tag IA', 'Nova Norma'],
                        status: 'Indexado'
                    });
                    
                    renderTable();
                    
                    // Reset UI
                    submitBtn.disabled = false;
                    progressDiv.style.display = 'none';
                    progressBar.style.width = '0%';
                    uploadForm.reset();
                    dropZone.querySelector('p').innerText = 'Arraste e solte o PDF/DOCX aqui';
                }, 500);
            }
            
            progressBar.style.width = `${progress}%`;
            progressPercent.innerText = `${Math.floor(progress)}%`;
            
        }, 300);
    });
});
