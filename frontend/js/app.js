// js/app.js
// Mock Authentication & Routing System

class AppState {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('dsearch_user')) || null;
    }

    login(role) {
        this.user = { role, name: role === 'admin' ? 'Administrador' : 'Usuário Técnico' };
        localStorage.setItem('dsearch_user', JSON.stringify(this.user));
        this.redirect(role);
    }

    logout() {
        this.user = null;
        localStorage.removeItem('dsearch_user');
        window.location.href = 'index.html';
    }

    redirect(role) {
        if (role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'user.html';
        }
    }

    checkAuth(requiredRole = null) {
        const currentPath = window.location.pathname;
        
        if (!this.user && !currentPath.endsWith('index.html') && currentPath !== '/') {
            window.location.href = 'index.html';
            return false;
        }

        if (this.user && currentPath.endsWith('index.html')) {
            this.redirect(this.user.role);
            return false;
        }

        if (requiredRole && this.user && this.user.role !== requiredRole) {
            this.redirect(this.user.role);
            return false;
        }

        return true;
    }

    // Modal UI Handlers
    showAdminLogin() {
        const modal = document.getElementById('adminModal');
        if (modal) {
            modal.style.display = 'flex';
            // slight delay to allow display:flex to apply before adding opacity class for transition
            setTimeout(() => {
                modal.classList.add('show');
                document.getElementById('adminPassword').focus();
            }, 10);
        }
    }

    closeAdminLogin() {
        const modal = document.getElementById('adminModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.getElementById('adminPassword').value = '';
                document.getElementById('adminLoginError').style.display = 'none';
            }, 200); // match css transition duration
        }
    }

    submitAdminLogin() {
        const pass = document.getElementById('adminPassword').value;
        if (pass === 'admin123') { // Senha estática de MVP
            this.login('admin');
        } else {
            document.getElementById('adminLoginError').style.display = 'block';
        }
    }
}

const app = new AppState();

// Navigation Bar Component Injector
function injectNavbar() {
    if (!app.user) return;
    
    const navHTML = `
        <nav class="navbar">
            <div class="brand">
                <div class="brand-logo">Q</div>
                D-SearchAi
            </div>
            <div style="display: flex; align-items: center; gap: 20px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--status-success);"></div>
                    <span style="font-size: 0.9rem; color: var(--text-secondary)">Local RAG Active</span>
                </div>
                <div style="height: 24px; width: 1px; background: var(--glass-border);"></div>
                <span style="font-size: 0.9rem; color: var(--text-primary); font-weight: 500;">
                    ${app.user.name} <span class="badge badge-ai" style="margin-left: 8px">${app.user.role.toUpperCase()}</span>
                </span>
                <button class="btn btn-outline" onclick="app.logout()" style="padding: 6px 12px; font-size: 0.8rem">Sair</button>
            </div>
        </nav>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', navHTML);
}
