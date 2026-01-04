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

      function sendMessage() {
        if (window.opener) {
          window.opener.postMessage(
            'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider }),
            '*'
          );
          // Small delay to ensure message is received before closing
          setTimeout(function() { window.close(); }, 100);
        } else {
          document.body.innerHTML = '<p>Authentication successful! You can close this window.</p>';
        }
      }

      // Wait for DOM to be ready
      if (document.readyState === 'complete') {
        sendMessage();
      } else {
        window.addEventListener('load', sendMessage);
      }
    })();
  </script>
  <p>Authenticating...</p>
</body>
</html>
  `.trim();

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
