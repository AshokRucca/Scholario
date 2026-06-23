document.addEventListener('DOMContentLoaded', () => {
    // Check Auth State (Mock)
    const checkAuth = () => {
        const isAuth = localStorage.getItem('isAuth');
        const navActions = document.querySelector('.nav-actions');
        
        if (isAuth === 'true' && navActions) {
            navActions.innerHTML = `
                <a href="dashboard.html" class="btn btn-primary">Dashboard</a>
                <button onclick="logout()" class="btn btn-outline">Logout</button>
            `;
        }

        // Update Check Eligibility button routing
        const checkEligibilityBtn = document.getElementById('check-eligibility-btn');
        if (checkEligibilityBtn) {
            checkEligibilityBtn.href = isAuth === 'true' ? 'eligibility.html' : 'auth.html';
        }
    };

    window.logout = () => {
        localStorage.removeItem('isAuth');
        window.location.href = 'index.html';
    };

    checkAuth();
});
