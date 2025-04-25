
import { Clock } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-display text-4xl">Our Heritage</h2>
            <p className="text-gray-600 leading-relaxed">
              Since 1875, we have been crafting exceptional timepieces that combine traditional watchmaking expertise with contemporary design. Each watch is a testament to our commitment to quality and precision.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Clock className="h-8 w-8 text-gold-500" />
                <h3 className="font-semibold">Expert Craftsmanship</h3>
                <p className="text-sm text-gray-600">Handcrafted by master watchmakers</p>
              </div>
              <div className="space-y-2">
                <Clock className="h-8 w-8 text-gold-500" />
                <h3 className="font-semibold">Premium Materials</h3>
                <p className="text-sm text-gray-600">Only the finest materials used</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80"
              alt="Watchmaking"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
