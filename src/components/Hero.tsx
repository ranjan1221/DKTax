import React, { useEffect, useRef } from 'react';
import { ArrowRight, Award, Users, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Background animation
    gsap.set(backgroundRef.current?.children || [], { scale: 0, opacity: 0 });
    gsap.to(backgroundRef.current?.children || [], {
      scale: 1,
      opacity: 0.3,
      duration: 2,
      stagger: 0.5,
      ease: "power2.out"
    });

    // Main content animation
    tl.fromTo(titleRef.current?.children || [],
      { opacity: 0, y: 100, rotationX: 90 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(buttonsRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.2"
    )
    .fromTo(statsRef.current?.children || [],
      { opacity: 0, y: 50, rotationY: 45 },
      { opacity: 1, y: 0, rotationY: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(imageRef.current,
      { opacity: 0, x: 100, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
      "-=1"
    );

    // Floating animation for background elements
    gsap.to(backgroundRef.current?.children || [], {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-5, 5)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });

  }, []);

  const handleConsultationClick = () => {
    window.open('https://wa.me/919873819147?text=Hello, I would like to schedule a consultation with Dhiraj Kumar Pandey for my business needs.', '_blank');
  };

  const handleViewServicesClick = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleButtonHover = (e: React.MouseEvent, isEntering: boolean) => {
    const button = e.currentTarget;
    if (isEntering) {
      gsap.to(button, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(button.querySelector('.button-icon'), {
        x: 5,
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
      gsap.to(button.querySelector('.button-icon'), {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleStatHover = (e: React.MouseEvent, isEntering: boolean) => {
    const stat = e.currentTarget;
    if (isEntering) {
      gsap.to(stat, {
        scale: 1.1,
        rotationY: 10,
        z: 50,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(stat.querySelector('.stat-icon'), {
        rotation: 360,
        scale: 1.2,
        duration: 0.6,
        ease: "power2.out"
      });
    } else {
      gsap.to(stat, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(stat.querySelector('.stat-icon'), {
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28">
      {/* Enhanced Background with blue color scheme */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div ref={backgroundRef} className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 ref={titleRef} className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight perspective-1000">
              <span className="block transform-gpu">Dhiraj Kumar</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 transform-gpu">
                Pandey
              </span>
            </h1>
            
            <p ref={subtitleRef} className="text-xl md:text-2xl text-blue-100 mb-4 font-light">
              Professional Tax Consultant
            </p>
            
            <p ref={descriptionRef} className="text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
              Providing comprehensive financial solutions with over a decade of expertise in 
              taxation, accounting, and business advisory services. Your trusted partner for 
              financial growth and compliance.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg relative overflow-hidden group"
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                onClick={handleConsultationClick}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Get Consultation</span>
                  <ArrowRight className="h-5 w-5 button-icon" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold relative overflow-hidden group"
                onClick={handleViewServicesClick}
              >
                <span className="relative z-10">View Services</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Enhanced Stats with 3D effects */}
            <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
              <div 
                className="text-center group cursor-pointer transform-gpu"
                onMouseEnter={(e) => handleStatHover(e, true)}
                onMouseLeave={(e) => handleStatHover(e, false)}
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden">
                  <Award className="h-12 w-12 text-blue-400 mx-auto mb-4 stat-icon" />
                  <div className="text-3xl font-bold text-white mb-2">18+</div>
                  <div className="text-blue-200">Years Experience</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div 
                className="text-center group cursor-pointer transform-gpu"
                onMouseEnter={(e) => handleStatHover(e, true)}
                onMouseLeave={(e) => handleStatHover(e, false)}
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden">
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4 stat-icon" />
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-blue-200">Happy Clients</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div 
                className="text-center group cursor-pointer transform-gpu"
                onMouseEnter={(e) => handleStatHover(e, true)}
                onMouseLeave={(e) => handleStatHover(e, false)}
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden">
                  <TrendingUp className="h-12 w-12 text-indigo-400 mx-auto mb-4 stat-icon" />
                  <div className="text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-blue-200">Success Rate</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Vector Illustration */}
          <div ref={imageRef} className="relative">
            <div className="relative">
              {/* Main vector illustration */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <img 
                  src="/18784071_team_10.png" 
                  alt="Professional Tax Consultation Team"
                  className="w-full h-auto max-h-[500px] object-contain"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="text-white">
                    <div className="text-sm font-semibold">Tax Planning</div>
                    <div className="text-xs opacity-90">Expert Advice</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-4 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="text-white">
                    <div className="text-sm font-semibold">GST Compliance</div>
                    <div className="text-xs opacity-90">100% Accurate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center cursor-pointer group">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse group-hover:animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;