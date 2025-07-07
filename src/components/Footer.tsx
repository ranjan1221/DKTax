import React, { useEffect, useRef } from 'react';
import { Calculator, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer content animation
      gsap.fromTo(contentRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Bottom bar animation
      gsap.fromTo(bottomRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Company Formation',
    'GST Registration',
    'Income Tax Filing',
    'Audit Services',
    'Business Licenses',
    'Tax Planning'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' }
  ];

  const handleSocialHover = (e: React.MouseEvent, isEntering: boolean) => {
    const social = e.currentTarget;
    
    if (isEntering) {
      gsap.to(social, {
        scale: 1.2,
        rotation: 360,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(social, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleLinkHover = (e: React.MouseEvent, isEntering: boolean) => {
    const link = e.currentTarget;
    
    if (isEntering) {
      gsap.to(link, {
        x: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(link, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleLogoHover = (e: React.MouseEvent, isEntering: boolean) => {
    const logo = e.currentTarget;
    const icon = logo.querySelector('.footer-logo-icon');
    
    if (isEntering) {
      gsap.to(icon, {
        rotation: 360,
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out"
      });
    } else {
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onMouseEnter={(e) => handleLogoHover(e, true)}
              onMouseLeave={(e) => handleLogoHover(e, false)}
            >
              <Calculator className="h-8 w-8 text-blue-400 footer-logo-icon" />
              <span className="text-xl font-bold">DRB Tax Consultants</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for comprehensive financial solutions, tax planning, 
              and business advisory services. Led by Tax Consultant Dhiraj Kumar Pandey.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`bg-gray-800 p-3 rounded-full ${social.color} transition-all duration-300 cursor-pointer`}
                  onMouseEnter={(e) => handleSocialHover(e, true)}
                  onMouseLeave={(e) => handleSocialHover(e, false)}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group cursor-pointer">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-gray-300">Plot No-12A,Lions Enclave,Marble Block,Vikas Nagar</p>
                  <p className="text-gray-300">Near St Bharti School,Hastal,Uttam Nagar New Delhi-59</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-gray-300">+91 98738 19147</p>
                  {/* <p className="text-gray-300">+91 87654 32109</p> */}
                </div>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-gray-300">dkp@drbtax.in</p>
                  {/* <p className="text-gray-300">dkaccounts@gmail.com</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div ref={bottomRef} className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 DRB Tax Consultants. All rights reserved. | Dhiraj Kumar Pandey, Tax Consultant
            </div>
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;