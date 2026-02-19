// tomiwa: Updated - Import Montserrat Alternates from Google Fonts for body text
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";

// tomiwa: Updated - Configure Montserrat Alternates font with multiple weights for flexibility
// This matches the brand guidelines for body text and UI elements
const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat-alternates", // CSS variable to use in Tailwind
  display: "swap", // Shows fallback font while font loads, better UX
  fallback: ['system-ui', 'arial', 'sans-serif'], // Fallback fonts if Google Fonts fails
});

// tomiwa: Updated - Update metadata with your actual app info
export const metadata = {
  title: "Ready Job Seeker",
  description: "Your AI-powered job search companion",
};

export default function RootLayout({ children }) {
  return (
    // tomiwa: Updated - Apply Montserrat Alternates font variable to the entire app
    <html lang="en" className={montserratAlternates.variable}>
      <body className="font-sans antialiased bg-white text-brand-black">
        {children}
      </body>
    </html>
  );
}
