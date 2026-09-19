import Header from "../components/Header";
import Hero from "../components/Hero";
import Plan from "../components/Plan";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Plan />
        <Footer />
      </main>
    </>
  );
};

export default Home;
