document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
  
    if (name && email) {
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      window.location.href = 'todo.html';
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  });
  