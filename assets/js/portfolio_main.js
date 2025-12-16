// script.js - Consolidated filter system
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allProjects = document.querySelectorAll('#all-projects-content .project-container');
    const projectCountElement = document.getElementById('project-count');
    
    function updateProjectCount() {
        const visibleProjects = document.querySelectorAll('#all-projects-content .project-container[style="display: block"], #all-projects-content .project-container:not([style])');
        if (projectCountElement) {
            projectCountElement.textContent = visibleProjects.length;
        }
    }
    
    function applyFilter(filter) {
        allProjects.forEach(project => {
            if (filter === 'all') {
                project.style.display = 'block';
            } else if (filter === 'lts' || filter === 'vcr' || filter === 'ra' || filter === 'pdf') {
                // Filter by project type
                const projectType = project.getAttribute('data-type');
                if (projectType === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            } else {
                // Filter by category
                const categories = project.getAttribute('data-category');
                if (categories && categories.includes(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            }
        });
        
        updateProjectCount();
        updateActiveButton(filter);
    }
    
    function updateActiveButton(activeFilter) {
        filterButtons.forEach(btn => {
            const btnFilter = btn.getAttribute('data-filter');
            if (btnFilter === activeFilter) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }
    
    // Initialize filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });
    
    // Navigation links for project types
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId.includes('-projects')) {
                const filterType = targetId.split('-')[0];
                applyFilter(filterType);
                
                // Scroll to that section
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Initialize with all projects showing
    applyFilter('all');
    updateProjectCount();
});