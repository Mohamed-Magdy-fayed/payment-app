import Footer from "@/components/Footer";
import Main from "@/components/Main";
import ComplexNavbar from "@/components/Navbar";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center">
      <ComplexNavbar />
      <Main />
      <Footer />
    </div>
  )
}
