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
  // Uses 3-step handshake: 1) notify parent, 2) listen for response, 3) send token
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>OAuth Callback</title>
</head>
<body>
  <p id="status">Authenticating...</p>
  <script>
    (function() {
      const token = ${JSON.stringify(tokenData.access_token)};
      const provider = 'github';
      const status = document.getElementById('status');

      if (!window.opener) {
        status.textContent = 'Error: window.opener is null. Cannot complete authentication.';
        return;
      }

      // Step 1: Notify Decap CMS that we're authorizing
      status.textContent = 'Notifying CMS...';
      window.opener.postMessage('authorizing:' + provider, '*');

      // Step 2: Listen for response from Decap CMS
      window.addEventListener('message', function receiveMessage(e) {
        status.textContent = 'Received response from CMS, sending token...';

        // Step 3: Send the token back using the origin from the message
        const content = { token: token, provider: provider };
        window.opener.postMessage(
          'authorization:' + provider + ':success:' + JSON.stringify(content),
          e.origin
        );

        status.textContent = 'Authentication complete! Closing...';
        setTimeout(function() { window.close(); }, 500);
      }, false);
    })();
  </script>
</body>
</html>
  `.trim();

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
