export async function onRequest(context) {
  const clientId = context.env.GITHUB_CLIENT_ID;
  const redirectUri = `${new URL(context.request.url).origin}/api/callback`;

  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'repo,user');
  authUrl.searchParams.set('state', crypto.randomUUID());

  return Response.redirect(authUrl.toString(), 302);
}
