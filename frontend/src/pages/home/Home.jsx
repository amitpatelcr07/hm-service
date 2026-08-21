import Hero from "../../components/home/Hero";
import HowItWorks from "../../components/home/HowItWorks";
import Services from "../../components/home/Services";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import CTA from "../../components/home/CTA";
import Footer from "../../components/home/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <HowItWorks />
      <Services />
      <WhyChooseUs />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
