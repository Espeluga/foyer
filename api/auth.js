// api/auth.js
export default function handler(req, res) {
  const { password } = req.query;
  const validPassword = 'Chato9@06740'; // ← Remplace par ton mot de passe
  
  // Vérifie si l'utilisateur a déjà le cookie
  const hasCookie = req.headers.cookie?.includes('auth=true');
  
  if (hasCookie) {
    // Redirige vers la page demandée
    const target = req.headers.referer?.replace(/https?:\/\/[^\/]+/, '') || '/';
    res.setHeader('Location', target);
    res.status(302).end();
    return;
  }
  
  // Si le mot de passe est correct, on pose un cookie
  if (password === validPassword) {
    res.setHeader('Set-Cookie', 'auth=true; Max-Age=2592000; Path=/; HttpOnly');
    res.setHeader('Location', '/');
    res.status(302).end();
    return;
  }
  
  // Sinon, on affiche la page de connexion
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Accès privé - Foyer L'Espeluga</title>
  <style>
    body {
      background: #0D0D0D;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: Arial, sans-serif;
      margin: 0;
    }
    .login {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(12px);
      padding: 2rem;
      border-radius: 28px;
      text-align: center;
      border: 1px solid #ffd700;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }
    h1 { color: #ffd700; margin-bottom: 0.5rem; }
    p { color: white; margin-bottom: 1.5rem; }
    input, button {
      padding: 0.8rem 1.2rem;
      margin: 0.5rem;
      border-radius: 40px;
      border: none;
      font-size: 1rem;
    }
    input { background: white; }
    button {
      background: #ffd700;
      cursor: pointer;
      font-weight: bold;
      transition: 0.2s;
    }
    button:hover { background: #ffaa00; transform: scale(1.02); }
  </style>
</head>
<body>
  <div class="login">
    <h1>🔒 Site privé</h1>
    <p>Réservé à l'équipe et aux jeunes du foyer</p>
    <form method="GET">
      <input type="password" name="password" placeholder="Chato9@06740" autofocus>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</body>
</html>
  `);
}
