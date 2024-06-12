import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-[#fff8e1]">
      <Header />
      <img className="w-full" src="/banner.png" />
      {children}
      <Footer />
    </div>
  );
}
