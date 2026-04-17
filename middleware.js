// middleware.js - Version simplifiée pour Vercel (Edge Runtime)

export const config = {
  matcher: '/(.*)', // Protège toutes les pages
};

export default function middleware(request) {
  // Vérifie si l'utilisateur est déjà authentifié
  const authCookie = request.cookies.get('auth');
  
  if (authCookie === 'true') {
    return; // Laisse passer
  }
  
  // Vérifie si le mot de passe est fourni dans l'URL
  const url = new URL(request.url);
  const password = url.searchParams.get('password');
  
  // ⬇️ Remplace 'MonMotDePasse' par ton mot de passe
  if (password === 'Chato9@06740') {
    // Mot de passe correct : on crée un cookie et on redirige
    const response = new Response(null, {
      status: 302,
      headers: { 'Location': '/' }
    });
    response.cookies.set('auth', 'true', {
      maxAge: 30 * 24 * 60 * 60, // 30 jours
      path: '/',
    });
    return response;
  }
  
  // Mot de passe incorrect ou absent : on affiche la page de login
  return new Response(
    `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Accès privé</title>
      <style>
        body {
          background: #0D0D0D;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        .login {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid #ffd700;
        }
        h1 { color: #ffd700; }
        input, button {
          padding: 0.8rem;
          margin: 0.5rem;
          border-radius: 30px;
          border: none;
        }
        button {
          background: #ffd700;
          cursor: pointer;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="login">
        <h1>🔒 Accès privé</h1>
        <form method="GET">
          <input type="password" name="password" placeholder="Mot de passe" autofocus>
          <button type="submit">Entrer</button>
        </form>
      </div>
    </body>
    </html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
