'use client';

import { EchoProvider } from '@merit-systems/echo-next-sdk/client';

export function Providers({ children }: { children: React.ReactNode }) {
  const echoAppId = process.env.NEXT_PUBLIC_ECHO_APP_ID || 'demo-app-id';
  
  return (
    <EchoProvider config={{ appId: echoAppId }}>
      {children}
    </EchoProvider>
  );
}
