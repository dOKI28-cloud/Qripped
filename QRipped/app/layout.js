import "./globals.css";
import Footer from "./components/footer";

export const metadata = {
  title: "QRipped Fitness",
  description: "Fitness website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}