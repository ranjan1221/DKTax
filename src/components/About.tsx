import React, { useEffect, useRef } from 'react';
import { CheckCircle, Award, BookOpen, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      // Content animation
      gsap.fromTo(contentRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Achievements animation
      gsap.fromTo(achievementsRef.current?.children || [],
        { opacity: 0, x: -30, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: 50, rotationY: 45 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Mission cards animation
      gsap.fromTo(missionRef.current?.children || [],
        { opacity: 0, y: 50, rotationX: 30 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const achievements = [
    'Professional Tax Consultant',
    'Over 10 years of professional experience',
    'Expert in Direct & Indirect Taxation',
    'Specialized in Corporate Law & Compliance',
    'Member of Professional Tax Consultants Association'
  ];

  const expertise = [
    { icon: Award, title: 'Professional Excellence', desc: 'Committed to delivering the highest standards of professional service' },
    { icon: BookOpen, title: 'Continuous Learning', desc: 'Staying updated with latest tax laws and regulations' },
    { icon: Users, title: 'Client-Centric Approach', desc: 'Personalized solutions tailored to each client\'s unique needs' }
  ];

  const handleAchievementHover = (e: React.MouseEvent, isEntering: boolean) => {
    const achievement = e.currentTarget;
    const icon = achievement.querySelector('.achievement-icon');
    
    if (isEntering) {
      gsap.to(achievement, {
        x: 10,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(icon, {
        scale: 1.3,
        rotation: 360,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(achievement, {
        x: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const handleMissionCardHover = (e: React.MouseEvent, isEntering: boolean) => {
    const card = e.currentTarget;
    
    if (isEntering) {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        rotationX: 5,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">Dhiraj Kumar Pandey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A dedicated Tax Consultant committed to providing exceptional financial and tax advisory services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 perspective-1000">
          <div ref={contentRef} className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Professional Journey</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              With over a decade of experience in the field of taxation and financial consulting, I have been 
              helping businesses and individuals navigate the complex world of financial compliance 
              and strategic planning. My expertise spans across various domains including corporate 
              taxation, GST compliance, company formation, and financial advisory services.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              As the founder of DRB Tax Consultants, I am committed to providing personalized, 
              reliable, and cost-effective solutions that help my clients achieve their financial 
              goals while ensuring complete regulatory compliance.
            </p>

            <div ref={achievementsRef} className="space-y-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 group cursor-pointer"
                  onMouseEnter={(e) => handleAchievementHover(e, true)}
                  onMouseLeave={(e) => handleAchievementHover(e, false)}
                >
                  <CheckCircle className="h-6 w-6 text-blue-500 achievement-icon" />
                  <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-200">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative perspective-1000">
            {/* Vector illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl">
                <img 
                  src="/16736634_16736634.png" 
                  alt="Professional Business Consultation"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
              
              {/* Floating expertise cards */}
              <div className="absolute -bottom-6 -left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Why Choose Me?</h4>
                  <div className="space-y-3">
                    {expertise.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 group">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2 group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm text-gray-900">{item.title}</h5>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div ref={missionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
          <div 
            className="bg-white rounded-2xl p-8 shadow-lg cursor-pointer transform-gpu relative overflow-hidden"
            onMouseEnter={(e) => handleMissionCardHover(e, true)}
            onMouseLeave={(e) => handleMissionCardHover(e, false)}
          >
            {/* Mission icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h4>
            <p className="text-gray-700 leading-relaxed">
              To provide comprehensive, reliable, and innovative financial solutions that empower 
              businesses and individuals to achieve their financial objectives while maintaining 
              the highest standards of compliance and ethical practices.
            </p>
          </div>
          <div 
            className="bg-white rounded-2xl p-8 shadow-lg cursor-pointer transform-gpu relative overflow-hidden"
            onMouseEnter={(e) => handleMissionCardHover(e, true)}
            onMouseLeave={(e) => handleMissionCardHover(e, false)}
          >
            {/* Vision icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <svg className="w-16 h-16 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h4>
            <p className="text-gray-700 leading-relaxed">
              To be the most trusted and preferred financial advisory firm, known for our expertise, 
              integrity, and commitment to client success. We aim to build long-term relationships 
              based on trust, transparency, and exceptional service delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;