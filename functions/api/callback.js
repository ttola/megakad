export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const clientId = context.env.GITHUB_CLIENT_ID;
  const clientSecret = context.env.GITHUB_CLIENT_SECRET;

  // Check if env variables are set
  if (!clientId || !clientSecret) {
    return new Response('OAuth not configured: missing environment variables', { status: 500 });
  }

  // Exchange code for access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(`OAuth error: ${tokenData.error_description || tokenData.error}`, { status: 400 });
  }

  if (!tokenData.access_token) {
    return new Response('Failed to get access token from GitHub', { status: 400 });
  }

  // Return HTML that sends the token back to Decap CMS via postMessage
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>OAuth Callback</title>
</head>
<body>
  <script>
    (function() {
      const token = ${JSON.stringify(tokenData.access_token)};
      const provider = 'github';
      const message = 'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider });

      function sendMessage() {
        const status = document.getElementById('status');

        if (window.opener) {
          status.innerHTML = 'Sending token to Decap CMS...';
          window.opener.postMessage(message, '*');
          status.innerHTML = 'Token sent! Closing window...';
          setTimeout(function() { window.close(); }, 250);
        } else {
          // Fallback: try to communicate via localStorage
          try {
            localStorage.setItem('decap-cms-auth', JSON.stringify({ token: token, provider: provider }));
            status.innerHTML = 'Auth saved. Please close this window and refresh the admin page.';
          } catch(e) {
            status.innerHTML = 'Authentication successful but window.opener is null. Token: ' + token.substring(0, 10) + '...';
          }
        }
      }

      // Run immediately
      sendMessage();
    })();
  </script>
  <p id="status">Authenticating...</p>
</body>
</html>
  `.trim();

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
