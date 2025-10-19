import React from 'react';
import partner1 from "@/assets/Partners/anza-logo.jpg";
import partner2 from "@/assets/Partners/IBSUC.png";
import partner3 from "@/assets/Partners/sahara.png";
import partner4 from "@/assets/Partners/shamba direct.png";
import partner5 from "@/assets/Partners/start hub.png";

const PartnerSection: React.FC = () => {
  const partners = [
    { id: '1', name: 'Anza', logo: partner1 },
    { id: '2', name: 'IBSUC', logo: partner2 },
    { id: '3', name: 'Sahara', logo: partner3 },
    { id: '4', name: 'Shamba Direct', logo: partner4 },
    { id: '5', name: 'Start Hub', logo: partner5 }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Orange Gradient Container */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-2xl shadow-md py-12 px-6">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 font-['Poppins']">
              Our Trusted Partners
            </h2>
            <p className="text-white/90 text-center max-w-2xl mx-auto text-lg font-['Inter']">
              Working together to empower learners with employability skills.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center p-4 rounded-lg hover:bg-white/10 transition-all duration-500 ease-in-out"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
