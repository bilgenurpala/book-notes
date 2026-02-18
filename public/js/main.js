document.addEventListener('DOMContentLoaded', function() {
    var alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-8px)';
            setTimeout(function() { alert.remove(); }, 500);
        }, 5000);
    });

    var themeBtn = document.getElementById('themeToggle');
    var themeIcon = document.getElementById('themeIcon');

    function syncTheme() {
        var current = document.documentElement.getAttribute('data-theme');
        if (!current || (current !== 'dark' && current !== 'light')) {
            var saved = localStorage.getItem('booknotes-theme');
            current = (saved === 'dark') ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', current);
        }
        if (themeIcon) {
            themeIcon.className = current === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    syncTheme();

    if (themeBtn) {
        themeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            var next = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('booknotes-theme', next);
            syncTheme();
        });
    }

    var mobileToggle = document.getElementById('mobileToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileIcon = document.getElementById('mobileToggleIcon');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            var isOpen = mobileMenu.classList.contains('open');
            if (isOpen) {
                mobileMenu.classList.remove('open');
                mobileIcon.className = 'fas fa-bars';
                document.body.classList.remove('body-no-scroll');
            } else {
                mobileMenu.classList.add('open');
                mobileIcon.className = 'fas fa-times';
                document.body.classList.add('body-no-scroll');
            }
        });

        mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                mobileIcon.className = 'fas fa-bars';
                document.body.classList.remove('body-no-scroll');
            });
        });
    }
});

function confirmDelete(message) {
    return confirm(message || 'Are you sure?');
}
