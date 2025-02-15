// dashboard/app/layout.js
import "./globals.css";
import ClientWagmiProvider from "../components/ClientWagmiProvider";

export const metadata = {
  title: "Immortal Domains",
  description: "Decentralized NFT Domain Renewal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWagmiProvider>
          {children}
        </ClientWagmiProvider>
      </body>
    </html>
  );
}
