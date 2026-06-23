document.addEventListener('DOMContentLoaded', () => {
    
    // Mock Data for the modals
    const applicationsData = {
        1: {
            title: "National Merit Scholarship",
            org: "Govt. of India",
            date: "Oct 15, 2026",
            statusHtml: '<span class="badge badge-success">🟢 Approved</span>',
            match: "100%",
            amount: "₹50,000 / year",
            deadline: "2026-08-30",
            eligibility: "Merit based, Income < ₹8L",
            desc: "The National Merit Scholarship provides financial assistance to meritorious students from low-income families to support their higher education.",
            track: [
                { status: "completed", title: "Application Submitted", date: "Oct 15, 2026" },
                { status: "completed", title: "Document Verification", date: "Oct 22, 2026" },
                { status: "completed", title: "Under Review", date: "Nov 01, 2026" },
                { status: "completed", title: "Approved", date: "Nov 15, 2026" }
            ],
            nextStep: "Funds will be disbursed to your registered bank account within 14 working days."
        },
        2: {
            title: "Tech Mahindra Foundation",
            org: "Industry Sponsored",
            date: "Oct 20, 2026",
            statusHtml: '<span class="badge badge-warning">🟡 Under Review</span>',
            match: "60%",
            amount: "₹1,00,000 / year",
            deadline: "2026-07-15",
            eligibility: "B.Tech Students, Income < ₹5L",
            desc: "Tech Mahindra Foundation Scholarship is designed for engineering students excelling in academics who require financial support.",
            track: [
                { status: "completed", title: "Application Submitted", date: "Oct 20, 2026" },
                { status: "completed", title: "Document Verification", date: "Oct 25, 2026" },
                { status: "active", title: "Under Review", date: "Pending" },
                { status: "pending", title: "Approval", date: "-" }
            ],
            nextStep: "The review committee is evaluating your application. You will be notified of the outcome shortly."
        },
        3: {
            title: "State NGO Fund",
            org: "State Govt.",
            date: "Nov 01, 2026",
            statusHtml: '<span class="badge badge-primary">🔵 Submitted</span>',
            match: "25%",
            amount: "₹30,000 / year",
            deadline: "2026-10-15",
            eligibility: "SC/ST/OBC category",
            desc: "A special fund allocated for students belonging to underrepresented communities.",
            track: [
                { status: "completed", title: "Application Submitted", date: "Nov 01, 2026" },
                { status: "active", title: "Document Verification", date: "In Progress" },
                { status: "pending", title: "Under Review", date: "-" },
                { status: "pending", title: "Approval", date: "-" }
            ],
            nextStep: "Your uploaded documents are being verified by the nodal officer."
        },
        4: {
            title: "Global Excellence Grant",
            org: "Intl. Univ Alliance",
            date: "Sep 10, 2026",
            statusHtml: '<span class="badge badge-danger">🔴 Rejected</span>',
            match: "0%",
            amount: "$5,000 / year",
            deadline: "2026-12-01",
            eligibility: "Exceptional academic record",
            desc: "International grant for students aiming for global universities.",
            track: [
                { status: "completed", title: "Application Submitted", date: "Sep 10, 2026" },
                { status: "completed", title: "Document Verification", date: "Sep 15, 2026" },
                { status: "completed", title: "Under Review", date: "Oct 01, 2026" },
                { status: "rejected", title: "Rejected", date: "Oct 10, 2026" }
            ],
            nextStep: "Application was rejected due to missing international certification."
        }
    };

    const overlay = document.getElementById('app-modal-overlay');
    const trackModal = document.getElementById('track-modal');
    const viewModal = document.getElementById('view-modal');
    const detailsModal = document.getElementById('details-modal');

    const closeModals = () => {
        overlay.classList.remove('active');
        trackModal.style.display = 'none';
        viewModal.style.display = 'none';
        detailsModal.style.display = 'none';
    };

    // Close listeners
    document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeModals));
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) closeModals();
    });

    // View Modal
    document.querySelectorAll('.action-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const data = applicationsData[id];
            if(!data) return;

            document.getElementById('view-scholarship-name').innerText = data.title;
            document.getElementById('view-org').innerText = data.org;
            document.getElementById('view-date').innerText = data.date;
            document.getElementById('view-status').innerHTML = data.statusHtml;
            document.getElementById('view-match').innerText = data.match;

            viewModal.style.display = 'block';
            overlay.classList.add('active');
        });
    });

    // Details Modal
    document.querySelectorAll('.action-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const data = applicationsData[id];
            if(!data) return;

            document.getElementById('details-scholarship-name').innerText = data.title;
            document.getElementById('details-desc').innerText = data.desc;
            document.getElementById('details-amount').innerText = data.amount;
            document.getElementById('details-deadline').innerText = data.deadline;
            document.getElementById('details-eligibility').innerText = data.eligibility;

            detailsModal.style.display = 'block';
            overlay.classList.add('active');
        });
    });

    // Track Modal
    document.querySelectorAll('.action-track').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const data = applicationsData[id];
            if(!data) return;

            document.getElementById('track-scholarship-name').innerText = data.title;
            document.getElementById('track-next-step').innerText = data.nextStep;

            const timelineContainer = document.querySelector('.tracking-timeline');
            timelineContainer.innerHTML = ''; // Clear

            data.track.forEach(item => {
                let iconClass = 'bg-border text-muted';
                let iconName = 'ph-circle';
                
                if(item.status === 'completed') {
                    iconClass = 'bg-success text-white';
                    iconName = 'ph-check';
                } else if(item.status === 'active') {
                    iconClass = 'bg-warning text-white animate-pulse';
                    iconName = 'ph-spinner-gap';
                } else if(item.status === 'rejected') {
                    iconClass = 'bg-danger text-white';
                    iconName = 'ph-x';
                }

                timelineContainer.innerHTML += `
                    <div class="timeline-item">
                        <div class="timeline-icon ${iconClass}" style="display: flex; align-items: center; justify-content: center;">
                            <i class="ph ${iconName}" style="font-size: 1rem;"></i>
                        </div>
                        <div class="timeline-content">
                            <h4 style="margin-bottom: 0.25rem;">${item.title}</h4>
                            <span class="time">${item.date}</span>
                        </div>
                    </div>
                `;
            });

            trackModal.style.display = 'block';
            overlay.classList.add('active');
        });
    });

});
