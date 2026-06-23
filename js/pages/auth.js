document.addEventListener('DOMContentLoaded', () => {
    
    // Toggle Login/Signup Forms
    const loginForm = document.getElementById('login-form-container');
    const signupForm = document.getElementById('signup-form-container');
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');

    // Handle Hash in URL
    if(window.location.hash === '#signup') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }

    showSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        window.location.hash = 'signup';
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        window.location.hash = '';
    });

    // Toggle Password Visibility
    const pwdToggles = document.querySelectorAll('.pwd-toggle');
    pwdToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.pwd-input');
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('ph-eye');
                this.classList.add('ph-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('ph-eye-slash');
                this.classList.add('ph-eye');
            }
        });
    });

    // Password Strength Checker
    const pwdInput = document.getElementById('signup-pwd');
    const strengthBarContainer = document.querySelector('.pwd-strength');
    const strengthBar = document.querySelector('.pwd-strength-bar');

    if(pwdInput) {
        pwdInput.addEventListener('input', (e) => {
            const val = e.target.value;
            strengthBarContainer.style.display = val.length > 0 ? 'block' : 'none';
            
            let strength = 0;
            if(val.length > 5) strength += 1;
            if(val.length > 8) strength += 1;
            if(/[A-Z]/.test(val)) strength += 1;
            if(/[0-9]/.test(val)) strength += 1;
            if(/[^A-Za-z0-9]/.test(val)) strength += 1;

            switch(strength) {
                case 0:
                case 1:
                    strengthBar.style.width = '20%';
                    strengthBar.style.backgroundColor = 'var(--danger)';
                    break;
                case 2:
                case 3:
                    strengthBar.style.width = '60%';
                    strengthBar.style.backgroundColor = 'var(--warning)';
                    break;
                case 4:
                case 5:
                    strengthBar.style.width = '100%';
                    strengthBar.style.backgroundColor = 'var(--success)';
                    break;
            }
        });
    }

    // Mock Form Submissions
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Mock login successful
        localStorage.setItem('isAuth', 'true');
        window.location.href = 'dashboard.html';
    });

    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = document.getElementById('signup-pwd').value;
        const confirmPwd = document.getElementById('signup-confirm-pwd').value;

        if (pwd !== confirmPwd) {
            alert("Passwords do not match!");
            return;
        }

        // Mock signup successful
        localStorage.setItem('isAuth', 'true');
        window.location.href = 'dashboard.html';
    });

});
