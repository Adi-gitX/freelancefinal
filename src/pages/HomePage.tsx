import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  QrCode,
  Star,
  Shield,
  Clock,
  Truck,
} from "lucide-react";

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: QrCode,
      title: "QR-Linked Memorials",
      description:
        "Each plaque includes a scannable QR code that connects to a personalized memorial page",
    },
    {
      icon: Heart,
      title: "Premium Materials",
      description:
        "Choose from brass, marble, steel, and other premium materials with precision engraving",
    },
    {
      icon: Shield,
      title: "Lasting Quality",
      description:
        "Weather-resistant materials and protective finishes ensure your memorial lasts forever",
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description:
        "Most orders completed within 5-7 days with express options available",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      text: "The quality is exceptional. The QR code makes it so easy for family to share memories.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    },
    {
      name: "Robert Chen",
      text: "Beautiful craftsmanship. The marble plaque looks perfect at the memorial garden.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
    },
    {
      name: "Maria Rodriguez",
      text: "The team was so caring and helped us create the perfect tribute for mom.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    },
  ];

  const samples = [
    {
      title: "Black Marble Memorial",
      material: "Marble",
      image: "src/pages/number2blackmarble.png",
    },
    {
      title: "Premium Brass Plaque",
      material: "Brass",
      image: "src/pages/number1brazz.png",
    },
    {
      title: "Natural Slate Memorial",
      material: "Slate",
      image: "src/pages/number5.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg"
            alt="Memorial background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Create a lasting
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  {" "}
                  memory
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Memorial plaques with scannable QR codes that link to
                personalized digital tributes. Honor your loved ones with
                premium craftsmanship and modern technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/create"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
                >
                  Create a Memorial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-lg hover:border-gray-500 hover:bg-gray-800 transition-all duration-200"
                >
                  How it Works
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose MemorialQrPlaque
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Combining traditional craftsmanship with modern technology to
              create meaningful memorials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-400">
              Creating your memorial plaque is easy and meaningful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Material & Design",
                description:
                  "Select from premium materials like marble, brass, or steel. Customize size, colors, and engraving style.",
                image: "src/pages/image1.png",
              },
              {
                step: "02",
                title: "Create Memorial Page",
                description:
                  "Add photos, stories, and memories to create a digital memorial that the QR code will link to.",
                image: "src/pages/image2.png",
              },
              {
                step: "03",
                title: "Receive & Install",
                description:
                  "Your handcrafted plaque arrives with everything needed for installation and a test QR scan.",
                image: "src/pages/image3.png",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-400 text-black text-2xl font-bold px-3 py-1 rounded-lg">
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Gallery */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Memorial Gallery
            </h2>
            <p className="text-xl text-gray-400">
              See our craftsmanship in memorial plaques we've created
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {samples.map((sample, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4">
                  <img
                    src={sample.image}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {sample.title}
                </h3>
                <p className="text-amber-400">{sample.material}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/samples"
              className="inline-flex items-center px-6 py-3 border-2 border-amber-400 text-amber-400 font-semibold rounded-lg hover:bg-amber-400 hover:text-black transition-all duration-200"
            >
              View All Samples
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What Families Say
            </h2>
            <p className="text-xl text-gray-400">
              Trusted by thousands of families worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <span className="text-white font-medium">
                    {testimonial.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
              Honor Their Memory Today
            </h2>
            <p className="text-xl text-black/80 mb-8">
              Create a lasting tribute that connects physical memorials with
              digital remembrance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/create"
                className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200"
              >
                Start Creating Memorial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/materials"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-200"
              >
                Explore Materials
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-black/20">
              <div className="flex items-center gap-2 text-black/80">
                <Truck className="w-5 h-5" />
                <span className="font-medium">Free Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-black/80">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Lifetime Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-black/80">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Handcrafted with Care</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
