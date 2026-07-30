(function () {
  'use strict';

  // Countdown
  var countdownDays = document.getElementById('countdownDays');
  if (countdownDays) {
    var weddingDate = new Date('2027-06-04T00:00:00-04:00');
    var days = Math.max(0, Math.round((weddingDate - new Date()) / 86400000));
    countdownDays.textContent = days.toLocaleString() + ' days';
  }

  // FAQ accordion (single item open at a time)
  var faqList = document.getElementById('faqList');
  if (faqList) {
    var faqItems = Array.prototype.slice.call(faqList.querySelectorAll('.faq-item'));
    faqItems.forEach(function (item) {
      var button = item.querySelector('.faq-question');
      button.addEventListener('click', function () {
        var wasOpen = item.classList.contains('is-open');
        faqItems.forEach(function (other) { other.classList.remove('is-open'); });
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  }

  // Email signup
  var signupForm = document.getElementById('signupForm');
  var signupHint = document.getElementById('signupHint');
  var signupConfirmed = document.getElementById('signupConfirmed');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('signupEmail').value.trim();
      if (!/.+@.+\..+/.test(email)) {
        signupHint.textContent = 'That email looks incomplete — mind checking it?';
        signupHint.classList.add('is-error');
        return;
      }

      var submitButton = signupForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      signupHint.classList.remove('is-error');
      signupHint.textContent = 'Sending…';

      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      })
        .then(function (response) {
          return response.json().then(function (data) {
            if (!response.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
            signupForm.hidden = true;
            signupConfirmed.hidden = false;
          });
        })
        .catch(function (err) {
          signupHint.textContent = err.message;
          signupHint.classList.add('is-error');
          submitButton.disabled = false;
        });
    });
  }

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
