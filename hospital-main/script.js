document.addEventListener('DOMContentLoaded', function() {
    // 表单验证
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // 清除之前的错误信息
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(element => element.remove());

            // 验证姓名
            if (nameInput.value.trim() === '') {
                isValid = false;
                const error = document.createElement('div');
                error.className = 'error-message';
                error.textContent = 'Name is required';
                error.style.color = 'red';
                nameInput.parentNode.appendChild(error);
                nameInput.style.borderColor = 'red';
            } else {
                nameInput.style.borderColor = '';
            }

            // 验证邮箱
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                isValid = false;
                const error = document.createElement('div');
                error.className = 'error-message';
                error.textContent = 'Email is required';
                error.style.color = 'red';
                emailInput.parentNode.appendChild(error);
                emailInput.style.borderColor = 'red';
            } else if (!emailPattern.test(emailInput.value)) {
                isValid = false;
                const error = document.createElement('div');
                error.className = 'error-message';
                error.textContent = 'Please enter a valid email address';
                error.style.color = 'red';
                emailInput.parentNode.appendChild(error);
                emailInput.style.borderColor = 'red';
            } else {
                emailInput.style.borderColor = '';
            }

            // 验证消息
            if (messageInput.value.trim() === '') {
                isValid = false;
                const error = document.createElement('div');
                error.className = 'error-message';
                error.textContent = 'Message is required';
                error.style.color = 'red';
                messageInput.parentNode.appendChild(error);
                messageInput.style.borderColor = 'red';
            } else {
                messageInput.style.borderColor = '';
            }

            // 如果表单有效，提交表单
            if (isValid) {
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });

        // 当用户点击输入框时改变样式
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--maincolor)';
                this.style.boxShadow = '0 0 0 0.25rem rgba(46, 200, 166, 0.25)';
            });

            input.addEventListener('blur', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        });
    } else {
        console.log('Contact form not found.');
    }

    // 轮播图功能
    const carousel = document.querySelector('.carousel');
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (carousel && slides.length > 0) {
        const slideCount = slides.length;
        let currentSlide = 0;
        let autoSlide = setInterval(nextSlide, 3000);
        
        // 初始化指示器
        for (let i = 0; i < slideCount; i++) {
            const indicator = document.createElement('button');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        
        updateIndicators();
        
        function updateIndicators() {
            const indicators = indicatorsContainer.querySelectorAll('button');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
        
        function goToSlide(index) {
            if (index >= 0 && index < slideCount) {
                currentSlide = index;
                slidesContainer.style.transform = `translateX(-${currentSlide * 500 / slideCount}%)`;
                updateIndicators();
            }
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            slidesContainer.style.transform = `translateX(-${currentSlide * 500 / slideCount}%)`;
            updateIndicators();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            slidesContainer.style.transform = `translateX(-${currentSlide * 500 / slideCount}%)`;
            updateIndicators();
        }
        
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
        carousel.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 3000);
        });
        
        let touchStartX = 0;
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        carousel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) nextSlide(); // 向左滑动
            if (touchEndX - touchStartX > 50) prevSlide(); // 向右滑动
        });
        
        console.log(`Slide count: ${slideCount}`);
    } else {
        console.log('Carousel or slides not found.');
    }

    // 导航菜单切换
    const menubar = document.querySelector('#menu-bars');
    const navbar = document.querySelector('.navbar');

    if (menubar && navbar) {
        const toggleMenu = () => {
            const isExpanded = navbar.classList.toggle('active');
            menubar.classList.toggle('fa-times');
            navbar.setAttribute('aria-expanded', isExpanded);
            menubar.setAttribute('aria-label', isExpanded ? 'Close navigation menu' : 'Open navigation menu');
        };

        menubar.addEventListener('click', toggleMenu);

        menubar.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMenu();
            }
        });
    } else {
        console.error('Menu bar or navbar not found in the DOM');
    }

    // 视频循环播放切换
    const video = document.querySelector('.home-right-content video');
    const toggleButton = document.querySelector('.toggle-loop');

    if (video && toggleButton) {
        toggleButton.addEventListener('click', () => {
            video.loop = !video.loop;
            toggleButton.textContent = video.loop ? 'Disable Loop' : 'Enable Loop';
        });

        video.addEventListener('ended', () => {
            video.style.opacity = '0';
            setTimeout(() => {
                video.play();
                video.style.opacity = '1';
            }, 300);
        });

        video.addEventListener('play', () => {
            video.classList.add('playing');
        });

        video.addEventListener('pause', () => {
            video.classList.remove('playing');
        });
    } else {
        console.error('Video or toggle button not found in the DOM');
    }
});
