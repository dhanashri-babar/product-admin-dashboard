import "./globals.css";

export const metadata = {
  title: "Product Admin Dashboard",
  description: "Next.js product admin dashboard assignment"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}