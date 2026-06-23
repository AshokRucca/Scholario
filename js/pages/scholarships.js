document.addEventListener('DOMContentLoaded', () => {
    
    const container = document.getElementById('scholarships-container');
    const noResults = document.getElementById('no-results');
    
    // Inputs
    const searchInput = document.getElementById('search-input');
    const tabBtns = document.querySelectorAll('.tab-btn');

    let currentCategory = 'all';
    let selectedState = 'all';
    let selectedAmount = 'all';

    const renderCards = (data) => {
        container.innerHTML = '';
        
        if (data.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';

        data.forEach((scholarship, index) => {
            const delay = (index % 6) * 100; // Stagger animation
            const card = document.createElement('div');
            card.className = `card scholarship-card animate-fade-in-up delay-${delay}`;
            
            let badgeClass = 'badge-primary';
            let badgeIcon = 'ph-tag';
            let categoryName = scholarship.category;

            if(scholarship.category === 'government') { badgeClass = 'badge-govt'; badgeIcon = 'ph-bank'; categoryName = 'Government'; }
            if(scholarship.category === 'ngo') { badgeClass = 'badge-ngo'; badgeIcon = 'ph-users'; categoryName = 'NGO'; }
            if(scholarship.category === 'industry') { badgeClass = 'badge-industry'; badgeIcon = 'ph-briefcase'; categoryName = 'Industry'; }
            if(scholarship.category === 'university') { badgeClass = 'badge-university'; badgeIcon = 'ph-graduation-cap'; categoryName = 'University'; }
            if(scholarship.category === 'international') { badgeClass = 'badge-intl'; badgeIcon = 'ph-globe'; categoryName = 'International'; }

            card.innerHTML = `
                <div class="card-header">
                    <div class="card-header-content">
                        <h3>${scholarship.title}</h3>
                        <div class="provider">${scholarship.provider}</div>
                    </div>
                    <span class="scholarship-badge ${badgeClass}">
                        <i class="ph ${badgeIcon}"></i> ${categoryName}
                    </span>
                </div>
                
                <div class="card-info">
                    <div class="info-row">
                        <i class="ph ph-currency-inr"></i>
                        <span>${scholarship.amountText}</span>
                    </div>
                    <div class="info-row">
                        <i class="ph ph-calendar"></i>
                        <span>Deadline: ${new Date(scholarship.deadline).toLocaleDateString()}</span>
                    </div>
                    <div class="info-row">
                        <i class="ph ph-map-pin"></i>
                        <span>${scholarship.state}</span>
                    </div>
                </div>
                
                <div class="card-actions">
                    <button class="btn btn-outline view-details-btn" data-id="${scholarship.id}">View Details</button>
                    <button class="btn btn-primary" onclick="alert('Application Started!')">Apply</button>
                </div>
            `;
            container.appendChild(card);
        });

        // Bind Modal Events
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                openModal(id);
            });
        });
    };

    const filterData = () => {
        const query = searchInput.value.toLowerCase();

        const filtered = scholarshipsData.filter(item => {
            // Category match
            if (currentCategory !== 'all' && item.category !== currentCategory) return false;
            
            // Search match
            if (query && !item.title.toLowerCase().includes(query) && !item.provider.toLowerCase().includes(query)) return false;
            
            // State match
            if (selectedState !== 'all' && item.state !== 'All' && item.state !== selectedState) return false;
            
            // Amount match
            if (selectedAmount === 'low1' && item.amount >= 10000) return false;
            if (selectedAmount === 'low2' && (item.amount < 10000 || item.amount >= 25000)) return false;
            if (selectedAmount === 'mid1' && (item.amount < 25000 || item.amount >= 50000)) return false;
            if (selectedAmount === 'mid2' && (item.amount < 50000 || item.amount >= 100000)) return false;
            if (selectedAmount === 'high' && item.amount < 100000) return false;

            return true;
        });

        renderCards(filtered);
    };

    // Custom Dropdown Initialization
    const initDropdown = (dropdownId, onSelect) => {
        const dropdown = document.getElementById(dropdownId);
        if(!dropdown) return;
        const header = dropdown.querySelector('.dropdown-header');
        const options = dropdown.querySelectorAll('.dropdown-option');
        const selectedText = dropdown.querySelector('.selected-text');
        
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-dropdown').forEach(d => {
                if(d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
        });

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                options.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                selectedText.innerText = opt.innerText;
                dropdown.classList.remove('open');
                onSelect(opt.getAttribute('data-value'));
            });
        });
    };

    initDropdown('state-dropdown', (val) => { selectedState = val; filterData(); });
    initDropdown('amount-dropdown', (val) => { selectedAmount = val; filterData(); });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open'));
    });

    // State Search Logic
    const stateSearch = document.getElementById('state-search');
    if(stateSearch) {
        stateSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            document.querySelectorAll('#state-options .dropdown-option').forEach(opt => {
                if(opt.getAttribute('data-value') === 'all') return;
                const text = opt.innerText.toLowerCase();
                opt.style.display = text.includes(query) ? 'block' : 'none';
            });
        });
        stateSearch.addEventListener('click', e => e.stopPropagation());
    }

    // Event Listeners
    searchInput.addEventListener('input', filterData);

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.getAttribute('data-filter');
            filterData();
        });
    });

    // Modal Logic
    const modal = document.getElementById('details-modal');
    const btnClose = document.getElementById('close-modal');
    const btnCancel = document.getElementById('modal-cancel');

    const openModal = (id) => {
        const item = scholarshipsData.find(s => s.id === id);
        if(!item) return;

        document.getElementById('modal-category').innerText = item.category;
        document.getElementById('modal-title').innerText = item.title;
        document.getElementById('modal-provider').innerText = item.provider;
        document.getElementById('modal-amount').innerText = item.amountText;
        document.getElementById('modal-deadline').innerText = new Date(item.deadline).toLocaleDateString();
        document.getElementById('modal-eligibility').innerText = item.eligibility;

        modal.classList.add('active');
    };

    const closeModal = () => {
        modal.classList.remove('active');
    };

    btnClose.addEventListener('click', closeModal);
    btnCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });

    // Init
    renderCards(scholarshipsData);
});
