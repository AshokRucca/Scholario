document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('eligibility-form');
    const steps = document.querySelectorAll('.wizard-step');
    const progressSteps = document.querySelectorAll('.step');
    const progressLine = document.querySelector('.progress-line');
    
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const btnSubmit = document.getElementById('btn-submit');
    
    let currentStep = 1;
    const totalSteps = steps.length;

    const updateWizard = () => {
        // Update Form Steps
        steps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.style.display = 'block';
                // Small animation
                step.classList.add('animate-fade-in');
            } else {
                step.style.display = 'none';
                step.classList.remove('animate-fade-in');
            }
        });

        // Update Progress Tracker
        progressSteps.forEach((step, index) => {
            if (index + 1 < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Update Progress Line width
        const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressLine.style.setProperty('--progress', `${progressPercent}%`);

        // Update Buttons
        if (currentStep === 1) {
            btnPrev.style.display = 'none';
        } else {
            btnPrev.style.display = 'inline-flex';
        }

        if (currentStep === totalSteps) {
            btnNext.style.display = 'none';
            btnSubmit.style.display = 'inline-flex';
        } else {
            btnNext.style.display = 'inline-flex';
            btnSubmit.style.display = 'none';
        }
    };

    // Validation mock
    const validateStep = (stepIndex) => {
        const currentStepEl = document.getElementById(`step-${stepIndex}`);
        const inputs = currentStepEl.querySelectorAll('input[required], select[required]');
        
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value && input.type !== 'radio') {
                isValid = false;
                input.style.borderColor = 'var(--danger)';
            } else {
                input.style.borderColor = '';
            }
        });

        return isValid;
    };

    btnNext.addEventListener('click', () => {
        // if (validateStep(currentStep)) { // Uncomment for strict validation
            currentStep++;
            updateWizard();
        // }
    });

    btnPrev.addEventListener('click', () => {
        currentStep--;
        updateWizard();
    });

    // File Upload Visuals
    const uploadZones = document.querySelectorAll('.upload-zone');
    uploadZones.forEach(zone => {
        const input = zone.querySelector('input[type="file"]');
        
        zone.addEventListener('click', () => {
            input.click();
        });

        input.addEventListener('change', () => {
            if (input.files.length > 0) {
                zone.classList.add('has-file');
                zone.querySelector('span').innerText = input.files[0].name;
            }
        });

        // Drag and drop
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.borderColor = 'var(--primary)';
        });

        zone.addEventListener('dragleave', () => {
            zone.style.borderColor = '';
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.borderColor = '';
            if (e.dataTransfer.files.length > 0) {
                input.files = e.dataTransfer.files;
                zone.classList.add('has-file');
                zone.querySelector('span').innerText = e.dataTransfer.files[0].name;
            }
        });
    });

    // Submission & Engine Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Mock Decision Engine
        const incomeInput = document.querySelector('input[type="number"]');
        const isEligible = incomeInput && incomeInput.value && parseInt(incomeInput.value) <= 800000;

        document.querySelector('.wizard-card').style.display = 'none';
        document.getElementById('wizard-progress').style.display = 'none';
        
        const resultsView = document.getElementById('results-view');
        resultsView.style.display = 'block';

        if (isEligible) {
            resultsView.innerHTML = `
                <div class="card result-card">
                    <div class="result-icon icon-success animate-pulse">
                        <i class="ph ph-check"></i>
                    </div>
                    <h2 style="color: var(--success); margin-bottom: 0.5rem;">Congratulations!</h2>
                    <p style="font-size: 1.1rem;">You are eligible for multiple scholarships.</p>
                    
                    <div class="scholarship-match-list">
                        <h4 style="margin-bottom: 1rem;">Top Matches:</h4>
                        <div class="match-item">
                            <div>
                                <strong>National Merit Scholarship</strong>
                                <p style="margin:0; font-size: 0.8rem; color: var(--text-secondary);">Govt. of India</p>
                            </div>
                            <a href="scholarships.html" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;">Apply Now</a>
                        </div>
                        <div class="match-item">
                            <div>
                                <strong>Tech Mahindra Foundation</strong>
                                <p style="margin:0; font-size: 0.8rem; color: var(--text-secondary);">Industry Sponsored</p>
                            </div>
                            <a href="scholarships.html" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;">Apply Now</a>
                        </div>
                        <div class="match-item">
                            <div>
                                <strong>State Post Matric Fund</strong>
                                <p style="margin:0; font-size: 0.8rem; color: var(--text-secondary);">State Govt.</p>
                            </div>
                            <a href="scholarships.html" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;">Apply Now</a>
                        </div>
                    </div>
                    
                    <a href="scholarships.html" class="btn btn-primary" style="margin-top: 2rem;">Browse All Eligible Scholarships</a>
                </div>
            `;
        } else {
            resultsView.innerHTML = `
                <div class="card result-card">
                    <div class="result-icon icon-danger">
                        <i class="ph ph-x"></i>
                    </div>
                    <h2 style="color: var(--danger); margin-bottom: 0.5rem;">Currently Not Eligible</h2>
                    <p style="font-size: 1.1rem; max-width: 500px; margin: 0 auto;">Based on the information provided, you do not meet the criteria for our major scholarship listings at this time.</p>
                    
                    <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); padding: 1rem; border-radius: 8px; margin-top: 1.5rem; text-align: left; max-width: 500px; margin: 1.5rem auto;">
                        <h4 style="color: var(--danger); margin-bottom: 0.5rem;">Reasons:</h4>
                        <ul style="list-style: disc; margin-left: 1.5rem; font-size: 0.9rem;">
                            <li>Family income exceeds the standard eligibility limit of ₹8,00,000.</li>
                        </ul>
                    </div>
                    
                    <button onclick="location.reload()" class="btn btn-outline" style="margin-top: 1rem;">Update Profile & Try Again</button>
                </div>
            `;
        }
    });
});
