/* ============================================
   710-MSSV | Main JavaScript
   ============================================ */

// ── Navigation Toggle ──
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    // Close menu when clicking a link (mobile)
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });
  }
});

// ============================================
// BÀI TẬP 1: Product Listing + Search
// ============================================
const products = [
  {
    id: 1,
    name: "Tai nghe Sony WH-1000XM5",
    price: 7490000,
    category: "Âm thanh",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",
    description: "Tai nghe chống ồn cao cấp, pin 30 giờ, âm thanh Hi-Res Audio."
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max 256GB",
    price: 29990000,
    category: "Điện thoại",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
    description: "Chip A17 Pro, camera 48MP, hỗ trợ USB-C, Titanium Design."
  },
  {
    id: 3,
    name: "Laptop MacBook Air M3",
    price: 27990000,
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    description: "Chip Apple M3, 16GB RAM, màn hình Liquid Retina 13.6 inch."
  },
  {
    id: 4,
    name: "Đồng hồ Apple Watch Ultra 2",
    price: 21990000,
    category: "Đồng hồ",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80",
    description: "Titanium, GPS + Cellular, chống nước 100m, pin 36 giờ."
  },
  {
    id: 5,
    name: "Bàn phím Logitech MX Keys S",
    price: 2690000,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    description: "Bàn phím không dây, backlit, kết nối 3 thiết bị, typing mượt mà."
  },
  {
    id: 6,
    name: "Camera Sony A7 IV",
    price: 46990000,
    category: "Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    description: "Full-frame 33MP, quay 4K 60fps, AF mắt thời gian thực."
  },
  {
    id: 7,
    name: "Loa JBL Charge 5",
    price: 3290000,
    category: "Âm thanh",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
    description: "Loa Bluetooth chống nước IP67, pin 20 giờ, Powerbank tích hợp."
  },
  {
    id: 8,
    name: "Chuột Logitech MX Master 3S",
    price: 2290000,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
    description: "8000 DPI, cuộn MagSpeed, sạc USB-C, kết nối 3 thiết bị."
  }
];

/**
 * Xử lý input: Sanitize bằng cách dùng textContent thay vì innerHTML
 * để tránh XSS injection. Dùng .trim() + .toLowerCase() để normalize.
 */
function sanitizeInput(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.textContent.trim().toLowerCase();
}

function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function renderProducts(list) {
  const grid = document.getElementById('product-grid');
  const emptyState = document.getElementById('empty-state');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Use textContent for user data to prevent XSS
  grid.innerHTML = list.map(p => `
    <div class="card" id="product-${p.id}">
      <img class="card-img" src="${p.image}" alt="${escapeHtml(p.name)}" 
           onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'">
      <div class="card-body">
        <span class="category">${escapeHtml(p.category)}</span>
        <h3>${escapeHtml(p.name)}</h3>
        <p class="price">${formatVND(p.price)}</p>
        <p class="description">${escapeHtml(p.description)}</p>
      </div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return str.replace(/[&<>"']/g, c => map[c]);
}

function searchProducts() {
  const input = document.getElementById('search-input');
  if (!input) return;
  
  const query = sanitizeInput(input.value);
  
  if (!query) {
    renderProducts(products);
    return;
  }

  // Tìm kiếm không phân biệt hoa thường bằng .toLowerCase()
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  renderProducts(results);
}

// ============================================
// BÀI TẬP 2: Registration Form Validation
// ============================================
function initRegistrationForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  const passwordInput = document.getElementById('reg-password');
  const toggleBtn = document.getElementById('toggle-password');

  // Toggle password visibility
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleBtn.textContent = isPassword ? '🙈' : '👁️';
    });
  }

  // Password strength meter
  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      updatePasswordStrength(passwordInput.value);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleRegistration();
  });
}

function updatePasswordStrength(password) {
  const bars = document.querySelectorAll('.password-strength .bar');
  const hint = document.getElementById('password-hint');
  if (!bars.length) return;

  // Reset
  bars.forEach(b => b.className = 'bar');

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;

  const labels = ['', 'Yếu', 'Trung bình', 'Mạnh'];
  const classes = ['', 'weak', 'medium', 'strong'];

  for (let i = 0; i < strength; i++) {
    bars[i].classList.add(classes[strength]);
  }

  if (hint) hint.textContent = strength > 0 ? labels[strength] : 'Ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

function handleRegistration() {
  const name = document.getElementById('reg-name')?.value.trim();
  const email = document.getElementById('reg-email')?.value.trim();
  const password = document.getElementById('reg-password')?.value;
  const agreed = document.getElementById('reg-terms')?.checked;

  const errorEl = document.getElementById('reg-error');
  const successEl = document.getElementById('reg-success');

  // Reset messages
  if (errorEl) { errorEl.classList.remove('show'); errorEl.textContent = ''; }
  if (successEl) { successEl.classList.remove('show'); successEl.textContent = ''; }

  function showError(msg) {
    if (errorEl) { errorEl.textContent = '⚠ ' + msg; errorEl.classList.add('show'); }
  }

  // Validate
  if (!name) return showError('Vui lòng nhập họ và tên.');
  if (!email) return showError('Vui lòng nhập email.');
  if (!isValidEmail(email)) return showError('Địa chỉ email không hợp lệ.');
  if (!password) return showError('Vui lòng nhập mật khẩu.');
  if (!isValidPassword(password)) return showError('Mật khẩu ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số.');
  if (!agreed) return showError('Vui lòng đồng ý với Điều khoản dịch vụ.');

  // Save to LocalStorage (mật khẩu KHÔNG nên lưu plaintext trong thực tế)
  const userData = {
    name: name,
    email: email,
    registeredAt: new Date().toISOString()
  };

  try {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    users.push(userData);
    localStorage.setItem('registered_users', JSON.stringify(users));
  } catch (e) {
    console.error('LocalStorage error:', e);
  }

  // Show success
  if (successEl) {
    successEl.textContent = '✓ Đăng ký thành công! Dữ liệu đã được lưu.';
    successEl.classList.add('show');
  }

  // Show success modal
  showModal('reg-success-modal');

  // Reset form
  document.getElementById('register-form')?.reset();
  updatePasswordStrength('');
}

// ============================================
// BÀI TẬP 3: Countdown Timer
// ============================================
let timerInterval = null;
let totalSeconds = 600; // 10 minutes
let isPaused = true;

function initCountdown() {
  const startBtn = document.getElementById('timer-start');
  const pauseBtn = document.getElementById('timer-pause');
  const resetBtn = document.getElementById('timer-reset');

  if (startBtn) startBtn.addEventListener('click', startTimer);
  if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
  if (resetBtn) resetBtn.addEventListener('click', resetTimer);

  updateTimerDisplay();
}

function startTimer() {
  if (!isPaused) return;
  isPaused = false;

  // Dùng clearInterval trước khi setInterval mới → tránh memory leak
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      isPaused = true;
      showModal('timer-modal');
      return;
    }
    totalSeconds--;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  pauseTimer();
  totalSeconds = 600;
  updateTimerDisplay();
  // Remove warning class
  const display = document.querySelector('.timer-display');
  const ring = document.querySelector('.ring-progress');
  if (display) display.classList.remove('warning');
  if (ring) ring.classList.remove('warning-ring');
}

function updateTimerDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Update text displays
  const display = document.querySelector('.timer-display');
  const innerTime = document.querySelector('.timer-inner .time');
  if (display) display.textContent = timeStr;
  if (innerTime) innerTime.textContent = timeStr;

  // Update ring progress
  const ring = document.querySelector('.ring-progress');
  if (ring) {
    const circumference = 2 * Math.PI * 130; // r=130
    const progress = totalSeconds / 600;
    ring.style.strokeDashoffset = circumference * (1 - progress);
  }

  // Warning animation when < 1 minute
  if (totalSeconds < 60 && totalSeconds > 0) {
    if (display) display.classList.add('warning');
    if (ring) ring.classList.add('warning-ring');
  } else {
    if (display) display.classList.remove('warning');
    if (ring) ring.classList.remove('warning-ring');
  }
}

// ── Modal Utilities ──
function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('show');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('show');
}

// ── Init on page load ──
document.addEventListener('DOMContentLoaded', () => {
  // Product page
  if (document.getElementById('product-grid')) {
    renderProducts(products);
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      // Debounce search for performance optimization
      let timeout;
      searchInput.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(searchProducts, 200);
      });
    }
  }

  // Registration form
  initRegistrationForm();

  // Countdown timer
  if (document.getElementById('timer-display')) {
    initCountdown();
  }
});
