import React, { useEffect, useRef } from 'react';
import { Building2, FileText, Calculator, Shield, Briefcase, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Service cards animation
      gsap.fromTo(cardsRef.current?.children || [],
        { opacity: 0, y: 100, rotationX: 45 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Vector illustration animation
      gsap.fromTo(vectorRef.current,
        { opacity: 0, scale: 0.8, rotation: 10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: vectorRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Additional services animation
      gsap.fromTo(additionalRef.current?.children || [],
        { opacity: 0, scale: 0.8, rotation: 10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: additionalRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const serviceCategories = [
    {
      title: 'Company Formation Services',
      icon: Building2,
      color: 'from-blue-500 to-indigo-500',
      services: [
        'Private Limited Company Registration',
        'Partnership Firm Formation',
        'Sole Proprietorship Registration',
        'LLP (Limited Liability Partnership) Formation'
      ]
    },
    {
      title: 'Business License Services',
      icon: FileText,
      color: 'from-purple-500 to-blue-500',
      services: [
        'GST Registration',
        'Trademark Registration',
        'FSSAI Registration',
        'MSME Registration'
      ]
    },
    {
      title: 'Other Business Services',
      icon: Briefcase,
      color: 'from-indigo-500 to-purple-500',
      services: [
        'PAN/TAN Application',
        'Income Tax Return Filing',
        'ROC Compliance Filing',
        'Accounting & Bookkeeping Services',
        'Digital Signature Certificate (DSC)',
        'GST Return Filing & Compliance',
        'Export-Import Consultancy',
        'Insurance Filing'
      ]
    }
  ];

  const additionalServices = [
    { 
      icon: Calculator, 
      title: 'Tax Planning & Advisory', 
      desc: 'Strategic tax planning to minimize liabilities'
    },
    { 
      icon: Shield, 
      title: 'Audit & Assurance', 
      desc: 'Comprehensive audit services for compliance'
    },
    { 
      icon: Globe, 
      title: 'International Taxation', 
      desc: 'Cross-border tax planning and compliance'
    }
  ];

  const handleCardHover = (e: React.MouseEvent, isEntering: boolean) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.service-icon');
    
    if (isEntering) {
      gsap.to(card, {
        y: -15,
        scale: 1.02,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(icon, {
        scale: 1.2,
        rotation: 10,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleAdditionalServiceHover = (e: React.MouseEvent, isEntering: boolean) => {
    const service = e.currentTarget;
    const icon = service.querySelector('.additional-icon');
    
    if (isEntering) {
      gsap.to(service, {
        scale: 1.08,
        rotationX: 10,
        z: 50,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(icon, {
        rotation: 360,
        scale: 1.3,
        duration: 0.6,
        ease: "power2.out"
      });
    } else {
      gsap.to(service, {
        scale: 1,
        rotationX: 0,
        z: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  const handleCTAHover = (e: React.MouseEvent, isEntering: boolean) => {
    const button = e.currentTarget;
    
    if (isEntering) {
      gsap.to(button, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(button, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial and business solutions tailored to meet your specific needs
          </p>
        </div>

        {/* Vector Illustration Section */}
        <div ref={vectorRef} className="text-center mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 max-w-2xl mx-auto">
            <img 
              src="/10782890_19199295-1.png" 
              alt="Professional Business Services"
              className="w-full h-auto max-h-80 object-contain mx-auto"
            />
          </div>
        </div>

        {/* Main Service Categories */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 perspective-1000">
          {serviceCategories.map((category, index) => (
            <div 
              key={index} 
              className="group cursor-pointer transform-gpu"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
                {/* Service header with gradient */}
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <category.icon className="h-12 w-12 mb-4 service-icon" />
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start space-x-3 group/item">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></div>
                        <span className="text-gray-700 group-hover/item:text-blue-600 transition-colors duration-200">
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Additional Specialized Services
          </h3>
          <div ref={additionalRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
            {additionalServices.map((service, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer transform-gpu"
                onMouseEnter={(e) => handleAdditionalServiceHover(e, true)}
                onMouseLeave={(e) => handleAdditionalServiceHover(e, false)}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 additional-icon">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                  <p className="text-gray-600">{service.desc}</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
            
            <h3 className="text-3xl font-bold mb-4 relative z-10">Ready to Get Started?</h3>
            <p className="text-xl mb-8 opacity-90 relative z-10">
              Let's discuss how we can help streamline your business operations and ensure compliance
            </p>
            <button 
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg relative overflow-hidden group z-10"
              onClick={() => {
                const target = document.querySelector('#services');
                if (target) {
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                      y: target,
                      offsetY: 80,
                      autoKill: true
                    },
                    ease: "power2.inOut"
                  });
                }
              }}
              onMouseEnter={(e) => handleCTAHover(e, true)}
              onMouseLeave={(e) => handleCTAHover(e, false)}
            >
              <span className="relative z-10">Schedule a Consultation</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;