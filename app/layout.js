// app/layout.js
export const metadata = {
  title: 'My E-commerce Website',
  description: 'Starter E-commerce Website with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
