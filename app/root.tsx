import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

import { createConfig, SequenceKit } from "@0xsequence/kit";

// Styles
import styles from "@0xsequence/design-system/styles.css?url";
import indexCss from "./index.css?url";
import { GithubCorner } from "~/components/GithubCorner";

export const meta: MetaFunction = () => {
  return [
    { title: "Sequence Embedded Wallet - Remix NodeJS Kit Starter" },
    { description: "A Remix NodeJS starter kit for Sequence Embedded Wallet" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },

  { rel: "stylesheet", href: indexCss },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;

  return {
    projectAccessKey: process.env.VITE_PROJECT_ACCESS_KEY,
    waasConfigKey: process.env.VITE_WAAS_CONFIG_KEY,
    googleClientId: process.env.VITE_GOOGLE_CLIENT_ID,
    appleClientId: process.env.VITE_APPLE_CLIENT_ID,
    appleRedirectURI: origin + pathname,
    walletConnectProjectId: process.env.VITE_WALLET_CONNECT_ID,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const {
    projectAccessKey,
    waasConfigKey,
    googleClientId,
    appleClientId,
    appleRedirectURI,
    walletConnectProjectId,
  } = useLoaderData<typeof loader>();

  const config = createConfig("waas", {
    projectAccessKey,
    chainIds: [1, 421614],
    defaultChainId: 421614,
    appName: "Kit Starter",
    waasConfigKey,
    googleClientId,
    appleClientId,
    appleRedirectURI,
    walletConnectProjectId,
  });

  return (
    <SequenceKit config={config}>
      <div id="root">
        <GithubCorner to="https://github.com/0xsequence-demos/kit-embedded-wallet-remix-nodejs-boilerplate" />
        <Outlet />
      </div>
    </SequenceKit>
  );
}
