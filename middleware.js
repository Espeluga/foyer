export function middleware(request) {
  const auth = request.cookies.get('auth');
  
  if (auth === 'true') {
    return;
  }
  
  const url = new URL(request.url);
  const password = url.searchParams.get('password');
  
  // ⬇️ CHANGE ICI : mets ton mot de passe entre les guillemets
  if (password === 'Chato9@06740') {
    const response = new Response(null, { status: 302, headers: { Location: '/' } });
    response.cookies.set('auth', 'true', { maxAge: 60 * 60 * 24 * 30 });
    return response;
  }
  
  return new Response(
    `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Accès privé - Foyer L'Espeluga</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #0D0D0D;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .login {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid #ffd700;
        }
        h1 { color: #ffd700; margin-bottom: 1rem; }
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
