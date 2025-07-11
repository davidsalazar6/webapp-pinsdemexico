export const environment = {
    production: false,
    url:"http://localhost:3001/api",
    auth: {
      domain: 'dev-pfnzd46sw3g6fkmo.us.auth0.com',
      clientId: 'R5vgjUcVGL7RGY1MttIPa8TjdPWNSrCr',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      cacheLocation: 'localstorage' as const,
      useRefreshTokens: true,
      httpInterceptor: {
        allowedList: [
          'http://localhost:3001/api/*'
        ]
      }
    },
  };
  