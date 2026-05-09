import { Hero } from '../components/Home/Hero';
import { Features } from '../components/Home/Features';
import { ProductShowcase } from '../components/Home/ProductShowcase';
import { Footer } from '../components/Home/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-x-hidden">
      <Hero />
      <Features />
      <ProductShowcase />
      <Footer />
    </div>
  );
}
