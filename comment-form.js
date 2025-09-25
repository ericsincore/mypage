// /js/comment-form.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('comment-form');
  const resultEl = document.getElementById('form-result');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // Simple honeypot check
    if (document.getElementById('_gotcha').value) {
      resultEl.textContent = 'Spam detected.';
      return;
    }
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    const data = new FormData(form);

    try {
      const resp = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (resp.ok) {
        resultEl.textContent = 'Thanks — your comment was sent.';
        form.reset();
      } else {
        const json = await resp.json().catch(()=>null);
        resultEl.textContent = (json && json.error) || 'There was a problem sending your comment.';
      }
    } catch (err) {
      resultEl.textContent = 'Network error. Please try again later.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  });
});