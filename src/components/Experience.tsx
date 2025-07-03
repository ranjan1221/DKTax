import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Stats animation
      gsap.fromTo(statsRef.current?.children || [],
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline animation
      gsap.fromTo(timelineRef.current?.children || [],
        { opacity: 0, x: (index) => index % 2 === 0 ? -100 : 100, rotationY: 45 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Calendar, number: '18+', label: 'Years of Experience', color: 'from-blue-500 to-indigo-500' },
    { icon: TrendingUp, number: '100%', label: 'Satisfaction Rate', color: 'from-purple-500 to-blue-500' },
    { icon: MapPin, number: '24/7', label: 'Availability', color: 'from-indigo-500 to-purple-500' }
  ];

  const handleStatHover = (e: React.MouseEvent, isEntering: boolean) => {
    const stat = e.currentTarget;
    const icon = stat.querySelector('.stat-icon');
    
    if (isEntering) {
      gsap.to(stat, {
        scale: 1.1,
        y: -10,
        rotationY: 10,
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
      gsap.to(stat, {
        scale: 1,
        y: 0,
        rotationY: 0,
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

  const handleTimelineHover = (e: React.MouseEvent, isEntering: boolean) => {
    const item = e.currentTarget;
    
    if (isEntering) {
      gsap.to(item, {
        scale: 1.02,
        y: -5,
        rotationX: 5,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(item, {
        scale: 1,
        y: 0,
        rotationX: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Adult <span className="text-blue-600">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exclusive content for mature audiences only (18+)
          </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 perspective-1000">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group cursor-pointer transform-gpu"
              onMouseEnter={(e) => handleStatHover(e, true)}
              onMouseLeave={(e) => handleStatHover(e, false)}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="h-6 w-6 text-white stat-icon" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Age Verification */}
        {/* <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Age Verification Required</h3>
          <p className="text-gray-700 mb-6">
            This section contains adult content and is only suitable for those who are 18 years or older.
            By entering, you confirm that you are at least 18 years of age.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Verify Age to Continue
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Experience;