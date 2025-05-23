/**
 * 울산 창업 원스톱 디지털 플랫폼 - 메인 JavaScript 파일
 */

document.addEventListener('DOMContentLoaded', function() {
    // 히어로 슬라이더 초기화
    initHeroSlider();
    
    // 데모 시뮬레이션 기능
    initDemo();
    
    // 스크롤 애니메이션
    initScrollAnimations();
    
    // 반응형 네비게이션
    initMobileNavigation();
});

/**
 * 데모 시뮬레이션 초기화 및 제어
 */
function initDemo() {
    const demoSteps = document.querySelectorAll('.demo-step');
    const nextButtons = document.querySelectorAll('.demo-next');
    const restartButton = document.querySelector('.demo-restart');
    
    if (!demoSteps.length) return;
    
    // 다음 단계 버튼 이벤트 리스너
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 현재 활성화된 단계 찾기
            const activeStep = document.querySelector('.demo-step.active');
            const currentIndex = Array.from(demoSteps).indexOf(activeStep);
            
            // 다음 단계로 이동
            if (currentIndex < demoSteps.length - 1) {
                activeStep.classList.remove('active');
                demoSteps[currentIndex + 1].classList.add('active');
                
                // 로딩 애니메이션 (2단계에서만)
                if (currentIndex + 1 === 1) {
                    simulateLoading();
                }
            }
        });
    });
    
    // 처음으로 버튼 이벤트 리스너
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            demoSteps.forEach(step => step.classList.remove('active'));
            demoSteps[0].classList.add('active');
        });
    }
}

/**
 * 로딩 애니메이션 시뮬레이션
 */
function simulateLoading() {
    const loadingBar = document.querySelector('.loading-bar');
    if (!loadingBar) return;
    
    // 로딩 애니메이션 리셋
    loadingBar.style.width = '0%';
    
    // 로딩 애니메이션 시작
    setTimeout(() => {
        loadingBar.style.width = '30%';
        
        setTimeout(() => {
            loadingBar.style.width = '60%';
            
            setTimeout(() => {
                loadingBar.style.width = '90%';
                
                setTimeout(() => {
                    loadingBar.style.width = '100%';
                }, 500);
            }, 700);
        }, 600);
    }, 300);
}

/**
 * 스크롤 애니메이션 초기화
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // 관찰자 옵션
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // 관찰자 생성
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 요소 관찰 시작
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * 모바일 반응형 네비게이션 초기화
 */
function initMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('nav');
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        menuToggle.classList.toggle('open');
    });
}

/**
 * 탭 컨트롤 함수
 * @param {string} tabId - 활성화할 탭 ID
 * @param {string} groupName - 탭 그룹 이름
 */
function openTab(tabId, groupName) {
    // 모든 탭 콘텐츠 숨기기
    const tabContents = document.querySelectorAll(`.${groupName}-content`);
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 모든 탭 버튼 비활성화
    const tabButtons = document.querySelectorAll(`.${groupName}-button`);
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 선택한 탭 활성화
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

/**
 * 차트 초기화 함수 (Chart.js 사용)
 * 각 차트 페이지에서 필요할 때 사용
 */
function initCharts() {
    // 트렌드 분석 페이지에서 필요한 차트 렌더링
    if (document.getElementById('keywordTrendChart')) {
        renderKeywordTrendChart();
    }
    
    // 기대효과 페이지 차트
    if (document.getElementById('economicEffectChart')) {
        renderEconomicEffectChart();
    }
    
    // 현황 분석 페이지 차트
    if (document.getElementById('startupEcosystemChart')) {
        renderStartupEcosystemChart();
    }
    
    // 실현가능성 페이지 차트
    if (document.getElementById('feasibilityRadarChart')) {
        renderFeasibilityRadarChart();
    }
}

/**
 * 검색 트렌드 차트 렌더링 (예시)
 * Chart.js 필요 (CDN으로 각 페이지에 추가)
 */
function renderKeywordTrendChart() {
    const ctx = document.getElementById('keywordTrendChart').getContext('2d');
    
    // 차트 데이터 (예시)
    const chartData = {
        labels: ['23.5', '23.6', '23.7', '23.8', '23.9', '23.10', '23.11', '23.12', 
                '24.1', '24.2', '24.3', '24.4', '24.5', '24.6', '24.7', '24.8', 
                '24.9', '24.10', '24.11', '24.12', '25.1', '25.2', '25.3', '25.4'],
        datasets: [
            {
                label: '창업',
                data: [100, 95, 90, 85, 82, 78, 74, 70, 76, 80, 82, 85, 88, 90, 85, 80, 75, 70, 68, 65, 66, 68, 70, 72],
                borderColor: '#0052A5',
                backgroundColor: 'rgba(0, 82, 165, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            },
            {
                label: '취업',
                data: [70, 72, 74, 75, 76, 78, 79, 80, 75, 73, 72, 74, 76, 75, 74, 73, 75, 77, 76, 75, 74, 73, 72, 71],
                borderColor: '#33CC99',
                backgroundColor: 'rgba(51, 204, 153, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            },
            {
                label: '규제',
                data: [30, 32, 35, 33, 34, 36, 38, 37, 35, 36, 38, 40, 38, 36, 34, 35, 37, 39, 40, 38, 36, 35, 37, 39],
                borderColor: '#FF6633',
                backgroundColor: 'rgba(255, 102, 51, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }
        ]
    };
    
    // 차트 옵션
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: '검색 관심도 (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: '날짜 (연.월)'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: '네이버 핵심 키워드 검색 트렌드',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false
            },
            legend: {
                position: 'top'
            }
        }
    };
    
    // 차트 생성
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
}

/**
 * 카운터 애니메이션
 * @param {HTMLElement} element - 카운터 엘리먼트
 * @param {number} target - 목표 숫자
 * @param {number} duration - 애니메이션 지속 시간 (ms)
 * @param {string} prefix - 숫자 앞에 표시할 텍스트
 * @param {string} suffix - 숫자 뒤에 표시할 텍스트
 */
function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        start = Math.min(start + increment, target * progress);
        
        // 정수인지 소수점 숫자인지 확인하여 포맷팅
        let displayValue;
        if (Number.isInteger(target)) {
            displayValue = Math.floor(start);
        } else {
            displayValue = start.toFixed(1);
        }
        
        element.textContent = `${prefix}${displayValue}${suffix}`;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * 통계 카운터 초기화
 * 화면에 표시될 때 카운터 애니메이션 시작
 */
function initStatCounters() {
    const counterElements = document.querySelectorAll('.stat-counter');
    
    // 관찰자 옵션
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // 관찰자 생성
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseFloat(element.getAttribute('data-target'));
                const prefix = element.getAttribute('data-prefix') || '';
                const suffix = element.getAttribute('data-suffix') || '';
                
                animateCounter(element, target, 2000, prefix, suffix);
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // 요소 관찰 시작
    counterElements.forEach(element => {
        observer.observe(element);
    });
}

// 페이지 로드 시 초기화
window.addEventListener('load', function() {
    // 페이지에 차트가 있으면 초기화
    if (typeof Chart !== 'undefined') {
        initCharts();
    }
    
    // 통계 카운터 초기화
    initStatCounters();
});

/**
 * 히어로 슬라이더 초기화 및 제어
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const progressBar = document.querySelector('.progress-bar');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    let progressInterval;
    const slideDuration = 5000; // 5초
    const progressStep = 100 / (slideDuration / 50); // 50ms마다 업데이트
    
    // 배경 이미지 설정
    slides.forEach(slide => {
        const bgImage = slide.getAttribute('data-bg');
        if (bgImage) {
            slide.style.backgroundImage = `url('${bgImage}')`;
        }
    });
    
    // 슬라이드 변경 함수
    function goToSlide(index) {
        // 현재 활성 슬라이드 비활성화
        slides[currentSlide].classList.remove('active');
        navDots[currentSlide].classList.remove('active');
        
        // 새 슬라이드 활성화
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        navDots[currentSlide].classList.add('active');
        
        // 진행바 리셋
        resetProgress();
    }
    
    // 다음 슬라이드로 이동
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    // 이전 슬라이드로 이동
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }
    
    // 진행바 리셋 및 시작
    function resetProgress() {
        if (progressBar) {
            progressBar.style.width = '0%';
            progressBar.style.transition = 'none';
            
            setTimeout(() => {
                progressBar.style.transition = `width ${slideDuration}ms linear`;
                progressBar.style.width = '100%';
            }, 50);
        }
    }
    
    // 자동 슬라이드 시작
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideDuration);
        resetProgress();
    }
    
    // 자동 슬라이드 정지
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        if (progressBar) {
            progressBar.style.transition = 'none';
        }
    }
    
    // 자동 슬라이드 재시작
    function restartAutoSlide() {
        stopAutoSlide();
        setTimeout(startAutoSlide, 100);
    }
    
    // 네비게이션 도트 클릭 이벤트
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentSlide) {
                goToSlide(index);
                restartAutoSlide();
            }
        });
    });
    
    // 화살표 버튼 클릭 이벤트
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            restartAutoSlide();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            restartAutoSlide();
        });
    }
    
    // 키보드 내비게이션
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            restartAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            restartAutoSlide();
        }
    });
    
    // 마우스 호버 시 일시 정지
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // 터치 스와이프 지원
    let startX = 0;
    let endX = 0;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // 최소 50px 스와이프
                if (diff > 0) {
                    nextSlide(); // 왼쪽으로 스와이프 (다음)
                } else {
                    prevSlide(); // 오른쪽으로 스와이프 (이전)
                }
                restartAutoSlide();
            }
        });
    }
    
    // 페이지 가시성 변경 시 슬라이더 제어
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
    
    // 초기 자동 슬라이드 시작
    startAutoSlide();
    
    // 브라우저 크기 변경 시 슬라이더 재조정
    window.addEventListener('resize', () => {
        // 슬라이더 높이 재조정 (필요시)
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.style.height = '100vh';
        }
    });
}
