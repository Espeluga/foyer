// middleware.js
// Version simplifiée et corrigée pour Vercel

export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  // 1. Vérifie si l'utilisateur a déjà le "cookie" d'authentification
  const isLoggedIn = request.cookies.get('app_auth')?.value === 'true';
  
  // 2. Si oui, on le laisse passer immédiatement
  if (isLoggedIn) {
    return;
  }

  // 3. Vérifie si un mot de passe a été envoyé dans l'URL
  const url = new URL(request.url);
  const password = url.searchParams.get('motdepasse');

  // ⚠️ REMPLACEZ 'VOTRE_MOT_DE_PASSE_ICI' par le mot de passe que vous voulez
  const validPassword = 'Chato9@06740';

  // 4. Si le mot de passe est correct, on le connecte et on le renvoie vers l'accueil
  if (password === validPassword) {
    const response = new Response(null, {
      status: 302,
      headers: { 'Location': '/' },
    });
    // Création du cookie de session (valable 30 jours)
    response.cookies.set('app_auth', 'true', {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    return response;
  }

  // 5. Si ni cookie, ni mot de passe correct, on affiche la page de connexion
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
          font-family: 'Arial', sans-serif;
        }
        .login-box {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          padding: 2rem;
          border-radius: 28px;
          text-align: center;
          border: 1px solid rgba(255, 215, 0, 0.5);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        h1 { color: #ffd700; margin-bottom: 1rem; }
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
      <div class="login-box">
        <h1>🔒 Site privé</h1>
        <p>Ce site est réservé à l'équipe et aux jeunes du foyer.</p>
        <form method="GET">
          <input type="password" name="motdepasse" placeholder="Mot de passe" autofocus>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </body>
    </html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
