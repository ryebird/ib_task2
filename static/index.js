function dechiffre() {
  const encryptedPassword = [55, 56, 54, 48, 115, 69, 114, 116, 107, 49, 50];
  return String.fromCharCode.apply(null, encryptedPassword);
}

const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');
const flag = document.getElementById('flag');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = "";
  flag.textContent = "";
  flag.hidden = true; 

  const fd = new FormData(form);
  const inputUser = fd.get('username') || "";
  const inputPass = fd.get('password') || "";

  try {
    const res = await fetch('/api/login', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: inputUser, password: inputPass })
    });
    const data = await res.json();

    if (data.success) {
      flag.textContent = data.flag;
      flag.hidden = false;
    } else {
      msg.textContent = data.message || "wrong username or password";
      flag.hidden = true;
    }
  } catch (error) {
    msg.textContent = "Connection error";
  }
});
