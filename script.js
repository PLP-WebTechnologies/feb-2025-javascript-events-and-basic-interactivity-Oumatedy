// Event Handling Utilities
const debounce = (func, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

// DOM Elements
const changeTextButton = document.getElementById('changeTextButton');
const toggleImageBtn = document.getElementById('toggleImageBtn');
const imageElement = document.getElementById('image');
const accordionButtons = document.querySelectorAll('.accordionButton');
const contactForm = document.getElementById('contactForm');
const registrationForm = document.getElementById('registrationForm');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

const galleryImages = [
  "https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg?auto=compress&w=600&h=400&fit=crop", // Classroom
  "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&w=600&h=400&fit=crop",   // Hallway
  "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&w=600&h=400&fit=crop", // Teacher helping
  "https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg?auto=compress&w=600&h=400&fit=crop",   // Kids reading
  "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&w=600&h=400&fit=crop"    // School building
];
let currentImg = 0;
const galleryImage = document.getElementById('galleryImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showGalleryImage(idx) {
  galleryImage.classList.remove('active');
  setTimeout(() => {
    galleryImage.src = galleryImages[idx];
    galleryImage.classList.add('active');
  }, 200);
}

prevBtn.addEventListener('click', () => {
  currentImg = (currentImg - 1 + galleryImages.length) % galleryImages.length;
  showGalleryImage(currentImg);
});
nextBtn.addEventListener('click', () => {
  currentImg = (currentImg + 1) % galleryImages.length;
  showGalleryImage(currentImg);
});


// Button Click Animation
changeTextButton.addEventListener('click', () => {
  changeTextButton.textContent = 'Text Changed!';
  changeTextButton.style.backgroundColor = '#ff9800';
  changeTextButton.setAttribute('aria-pressed', 'true');
});

// Image Gallery Toggle (Show/Hide the whole gallery)
const imageGallery = document.getElementById('imageGallery');
let isGalleryVisible = true; // Set to true if you want it visible by default

toggleImageBtn.addEventListener('click', () => {
  isGalleryVisible = !isGalleryVisible;
  imageGallery.style.display = isGalleryVisible ? 'flex' : 'none';
  toggleImageBtn.textContent = isGalleryVisible ? 'Hide Image' : 'Show Image';
});

// On page load, ensure correct initial state
imageGallery.style.display = isGalleryVisible ? 'flex' : 'none';


// Enhanced Accordion Functionality
accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    button.setAttribute('aria-expanded', !isExpanded);
    content.style.maxHeight = isExpanded ? '0' : `${content.scrollHeight}px`;
  });
});

// Password Visibility Toggle for Contact Form
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');

if (passwordInput && togglePasswordButton) {
  togglePasswordButton.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordButton.setAttribute('aria-label', 
      type === 'password' ? 'Show password' : 'Hide password');
  });
}

// Password Visibility Toggle for Registration Form
const passwordRegInput = document.getElementById('passwordReg');
const togglePasswordRegButton = document.getElementById('togglePasswordReg');

if (passwordRegInput && togglePasswordRegButton) {
  togglePasswordRegButton.addEventListener('click', () => {
    const type = passwordRegInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordRegInput.setAttribute('type', type);
    togglePasswordRegButton.setAttribute('aria-label', 
      type === 'password' ? 'Show password' : 'Hide password');
  });
}

// Form Validation Logic
const validateRequired = (input, feedbackElement) => {
  if (!input.value.trim()) {
    input.classList.add('invalid');
    feedbackElement.textContent = 'This field is required';
    return false;
  } else {
    input.classList.remove('invalid');
    feedbackElement.textContent = '';
    return true;
  }
};

const validateEmail = (emailInput, feedbackElement) => {
  const email = emailInput.value.trim();
  if (!email) {
    emailInput.classList.add('invalid');
    feedbackElement.textContent = 'Email is required';
    return false;
  }
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  emailInput.classList.toggle('invalid', !isValid);
  feedbackElement.textContent = isValid ? '' : 'Please enter a valid email address';
  return isValid;
};

const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 25;
  if (/[!@#$%^&*]/.test(password)) strength += 25;
  return strength;
};

const validatePassword = (passwordInput, feedbackElement, strengthMeter) => {
  const password = passwordInput.value.trim();
  if (!password) {
    passwordInput.classList.add('invalid');
    feedbackElement.textContent = 'Password is required';
    return false;
  }
  const isValid = password.length >= 8 && 
                 /[A-Z]/.test(password) && 
                 /\d/.test(password) && 
                 /[!@#$%^&*]/.test(password);
  
  passwordInput.classList.toggle('invalid', !isValid);
  feedbackElement.textContent = isValid ? '' : 
    'Password must contain at least 8 characters, one uppercase letter, one number, and one special character';
  
  // Update strength meter if provided
  if (strengthMeter) {
    const strength = calculatePasswordStrength(password);
    strengthMeter.style.width = `${strength}%`;
    strengthMeter.style.backgroundColor = 
      strength < 50 ? '#dc3545' :
      strength < 75 ? '#ffc107' : '#28a745';
  }
  
  return isValid;
};

// Contact Form Validation
if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailContactInput = document.getElementById('emailContact');
  const messageInput = document.getElementById('message');
  
  const nameFeedback = document.getElementById('nameFeedback');
  const emailContactFeedback = document.getElementById('emailContactFeedback');
  const messageFeedback = document.getElementById('messageFeedback');
  
  // Real-time validation
  if (nameInput && nameFeedback) {
    nameInput.addEventListener('input', debounce(() => validateRequired(nameInput, nameFeedback)));
  }
  
  if (emailContactInput && emailContactFeedback) {
    emailContactInput.addEventListener('input', debounce(() => validateEmail(emailContactInput, emailContactFeedback)));
  }
  
  if (messageInput && messageFeedback) {
    messageInput.addEventListener('input', debounce(() => validateRequired(messageInput, messageFeedback)));
  }
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = nameInput ? validateRequired(nameInput, nameFeedback) : true;
    const isEmailValid = emailContactInput ? validateEmail(emailContactInput, emailContactFeedback) : true;
    const isMessageValid = messageInput ? validateRequired(messageInput, messageFeedback) : true;
    
    if (isNameValid && isEmailValid && isMessageValid) {
      contactForm.reset();
      showToastMessage('Contact form submitted successfully!');
    }
  });
}

// Registration Form Validation
if (registrationForm) {
  const studentNameInput = document.getElementById('studentName');
  const parentEmailInput = document.getElementById('parentEmail');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const gradeLevelInput = document.getElementById('gradeLevel');
  
  const studentNameFeedback = document.getElementById('studentNameFeedback');
  const parentEmailFeedback = document.getElementById('parentEmailFeedback');
  const passwordRegFeedback = document.getElementById('passwordRegFeedback');
  const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');
  const gradeLevelFeedback = document.getElementById('gradeLevelFeedback');
  const strengthMeter = document.getElementById('passwordStrength');
  
  // Real-time validation
  if (studentNameInput && studentNameFeedback) {
    studentNameInput.addEventListener('input', debounce(() => validateRequired(studentNameInput, studentNameFeedback)));
  }
  
  if (parentEmailInput && parentEmailFeedback) {
    parentEmailInput.addEventListener('input', debounce(() => validateEmail(parentEmailInput, parentEmailFeedback)));
  }
  
  if (passwordRegInput && passwordRegFeedback && strengthMeter) {
    passwordRegInput.addEventListener('input', debounce(() => validatePassword(passwordRegInput, passwordRegFeedback, strengthMeter)));
  }
  
  if (confirmPasswordInput && confirmPasswordFeedback) {
    confirmPasswordInput.addEventListener('input', debounce(() => {
      if (confirmPasswordInput.value !== passwordRegInput.value) {
        confirmPasswordInput.classList.add('invalid');
        confirmPasswordFeedback.textContent = 'Passwords do not match';
        return false;
      } else {
        confirmPasswordInput.classList.remove('invalid');
        confirmPasswordFeedback.textContent = '';
        return true;
      }
    }));
  }
  
  if (gradeLevelInput && gradeLevelFeedback) {
    gradeLevelInput.addEventListener('change', () => validateRequired(gradeLevelInput, gradeLevelFeedback));
  }
  
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isStudentNameValid = validateRequired(studentNameInput, studentNameFeedback);
    const isParentEmailValid = validateEmail(parentEmailInput, parentEmailFeedback);
    const isPasswordValid = validatePassword(passwordRegInput, passwordRegFeedback, strengthMeter);
    const isGradeLevelValid = validateRequired(gradeLevelInput, gradeLevelFeedback);
    
    let isConfirmPasswordValid = true;
    if (confirmPasswordInput.value !== passwordRegInput.value) {
      confirmPasswordInput.classList.add('invalid');
      confirmPasswordFeedback.textContent = 'Passwords do not match';
      isConfirmPasswordValid = false;
    } else {
      confirmPasswordInput.classList.remove('invalid');
      confirmPasswordFeedback.textContent = '';
    }
    
    if (isStudentNameValid && isParentEmailValid && isPasswordValid && isConfirmPasswordValid && isGradeLevelValid) {
      registrationForm.reset();
      strengthMeter.style.width = '0';
      showToastMessage('Registration successful!');
    }
  });
}

// Toast Notification System
function showToastMessage(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 3000);
}

// Accessibility Features
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.activeElement.blur();
  }
});

// Initialize Image State
imageElement.style.opacity = '0';

// Scroll to Top Button
window.addEventListener('scroll', () => {
  // Show button after scrolling down 100px
  if (window.scrollY > 100) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

