import Echo from '@merit-systems/echo-next-sdk';

// Fallback configuration for development/demo purposes
const echoConfig = {
  appId: process.env.ECHO_APP_ID || 'demo-app-id',
};

export const { handlers, isSignedIn, openai, anthropic } = Echo(echoConfig);
