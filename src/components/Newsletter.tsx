
import { Button } from "./ui/button";

const Newsletter = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-4xl mb-4">Stay Updated</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive exclusive offers, new product announcements, and expert watch care tips.
        </p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
          <Button className="bg-gold-500 hover:bg-gold-600 text-black">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
