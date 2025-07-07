import React, { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Linkedin, Facebook } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Your coordinates
  const latitude = 28.638685291927303;
  const longitude = 77.05224596721266;
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.7158509996!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM4JzE5LjMiTiA3N8KwMDMnMDguMSJF!5e0!3m2!1sen!2sin!4v1620000000000`;
  const directionsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&navigate=yes`;

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

      // Contact info animation
      gsap.fromTo(contactInfoRef.current?.children || [],
        { opacity: 0, x: -50, rotationY: 45 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social media animation
      gsap.fromTo(socialRef.current?.children || [],
        { opacity: 0, scale: 0, rotation: 180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Map animation
      gsap.fromTo(mapRef.current,
        { opacity: 0, scale: 0.8, rotationY: 45 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 98738 19147', '+91 98730 78599'],
      color: 'from-blue-500 to-indigo-500',
      action: () => window.open('tel:+919873819147')
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['dkp@drbtax.in'],
      color: 'from-purple-500 to-blue-500',
      action: () => window.open('mailto:dkp@drbtax.in')
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['Plot No,-12A,Lions Enclave,Marble Block,Vikas Nagar', 'Uttam Nagar,New Delhi-59'],
      color: 'from-indigo-500 to-purple-500',
      action: () => window.open(directionsUrl)
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      color: 'from-cyan-500 to-blue-500',
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      action: () => window.open('https://wa.me/919873819147?text=Hello, I would like to know more about your services'),
      description: 'Chat with us instantly'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700',
      action: () => window.open('https://www.instagram.com/dkaccounts?igsh=MWR0NjR4djZ6cTZhOQ=='),
      description: 'Follow our updates'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      color: 'from-blue-600 to-indigo-600',
      hoverColor: 'hover:from-blue-700 hover:to-indigo-700',
      action: () => window.open('https://www.facebook.com/share/1Ab3gZgw7Q/'),
      description: 'Like our page'
    }
  ];

  const handleContactInfoHover = (e: React.MouseEvent, isEntering: boolean) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.contact-icon');
    
    if (isEntering) {
      gsap.to(card, {
        scale: 1.05,
        y: -10,
        rotationY: 10,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(icon, {
        rotation: 360,
        scale: 1.2,
        duration: 0.6,
        ease: "power2.out"
      });
    } else {
      gsap.to(card, {
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

  const handleSocialHover = (e: React.MouseEvent, isEntering: boolean) => {
    const social = e.currentTarget;
    const icon = social.querySelector('.social-icon');
    
    if (isEntering) {
      gsap.to(social, {
        scale: 1.1,
        y: -15,
        rotationY: 15,
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
      gsap.to(social, {
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

  const handleMapHover = (e: React.MouseEvent, isEntering: boolean) => {
    const map = e.currentTarget;
    
    if (isEntering) {
      gsap.to(map, {
        scale: 1.02,
        y: -5,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(map, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to take your business to the next level? Let's connect and discuss how we can help you achieve your financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Let's Start a Conversation</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Whether you need help with tax planning, company formation, or any other financial service, 
                I'm here to provide expert guidance tailored to your specific needs.
              </p>
            </div>

            <div ref={contactInfoRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 perspective-1000">
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer transform-gpu"
                  onMouseEnter={(e) => handleContactInfoHover(e, true)}
                  onMouseLeave={(e) => handleContactInfoHover(e, false)}
                  onClick={info.action || undefined}
                >
                  <div className="bg-gray-50 rounded-2xl p-6 relative overflow-hidden">
                    <div className={`bg-gradient-to-r ${info.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 contact-icon`}>
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Image */}
            <div className="relative rounded-2xl overflow-hidden h-64">
              <img 
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Professional Office Environment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-bold mb-2">Visit Our Office</h4>
                <p className="text-sm opacity-90">Professional consultation in a comfortable environment</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 transform-gpu">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Connect With Us</h3>
            <p className="text-gray-600 text-center mb-8">
              Follow us on social media for updates, tips, and insights about taxation and business advisory.
            </p>
            
            <div ref={socialRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 perspective-1000">
              {socialLinks.map((social, index) => (
                <div 
                  key={index} 
                  className={`bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-2xl p-6 text-white cursor-pointer group transform-gpu transition-all duration-300`}
                  onMouseEnter={(e) => handleSocialHover(e, true)}
                  onMouseLeave={(e) => handleSocialHover(e, false)}
                  onClick={social.action}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                      <social.icon className="h-8 w-8 social-icon" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{social.name}</h4>
                      <p className="text-sm opacity-90">{social.description}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              ))}
            </div>

            {/* Quick WhatsApp CTA */}
            <div className="mt-8 text-center">
              <button 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-8 rounded-full font-semibold shadow-lg relative overflow-hidden group transition-all duration-300"
                onClick={() => window.open('https://wa.me/9873819147?text=Hello, I would like to schedule a consultation')}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, y: -3, duration: 0.3 });
                  gsap.to(e.currentTarget.querySelector('.whatsapp-icon'), { x: 5, rotation: 15, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3 });
                  gsap.to(e.currentTarget.querySelector('.whatsapp-icon'), { x: 0, rotation: 0, duration: 0.3 });
                }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <MessageCircle className="h-5 w-5 whatsapp-icon" />
                  <span>Chat on WhatsApp</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div ref={mapRef} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-4 sm:p-8 transform-gpu">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Find Our Office</h3>
            <p className="text-lg text-gray-600">
              Located in the heart of New Delhi's business district for easy accessibility
            </p>
          </div>

          <div 
            className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer transform-gpu"
            onMouseEnter={(e) => handleMapHover(e, true)}
            onMouseLeave={(e) => handleMapHover(e, false)}
          >
            {/* Interactive Map Embed */}
            <div className="relative h-64 xs:h-72 sm:h-80 md:h-96 bg-gray-200">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '200px', minWidth: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl w-full h-full"
                title="DRB Tax Consultants Office Location"
              ></iframe>
              
              {/* Map Overlay with Office Info */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs w-[90vw]">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">DRB Tax Consultants</h4>
                    <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-line leading-snug break-words">
                      Plot No 12A, Lions Enclave,
                      Marble Block
                      <br />Vikas Nagar,
                      Near St. Bharti School,
                      Hastal, Uttam Nagar,
                      New Delhi-59
                    </p>
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <div className="absolute bottom-6 right-6">
                <button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => window.open(directionsUrl)}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                  }}
                >
                  <span className="flex items-center space-x-2">
                    <span>Get Directions</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Location Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Easy Parking</h4>
              <p className="text-gray-600 text-sm">Ample parking space available for client convenience</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Metro Access</h4>
              <p className="text-gray-600 text-sm">Nearby Metro Is Nawada and Uttam Nagar-West</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Business Hub</h4>
              <p className="text-gray-600 text-sm">Located in prime business district with modern facilities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;