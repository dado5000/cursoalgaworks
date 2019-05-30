export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api.herokuapp.com:8080',

  tokenWhiteListedDomains: [ /algamoney-api.herokuapp.com/ ],
  tokenBlackListedRoutes: [ /\/oauth\/token/ ]
};
