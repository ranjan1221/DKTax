import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Calculator, Phone, Mail, Home, User, Briefcase, Award, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial animation
    const tl = gsap.timeline();
    tl.fromTo(logoRef.current, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(navRef.current?.children || [], 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(contactRef.current?.children || [], 
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  useEffect(() => {
    // Mobile menu animation
    if (isMenuOpen) {
      gsap.set(mobileMenuRef.current, { x: '100%' });
      gsap.set(overlayRef.current, { opacity: 0 });
      
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(mobileMenuRef.current, {
        x: '0%',
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.1")
      .fromTo(mobileMenuRef.current?.querySelectorAll('.mobile-nav-item') || [], {
        opacity: 0,
        x: 50
      }, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3");
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: "power3.in"
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Services', href: '#services', icon: Briefcase },
    { name: 'Experience', href: '#experience', icon: Award },
    { name: 'Contact', href: '#contact', icon: MessageCircle },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed w-full z-40 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'
        }`}
        role="banner"
        aria-label="Main header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              ref={logoRef}
              className="flex items-center space-x-2 group cursor-pointer"
              onMouseEnter={() => {
                const logoIcon = logoRef.current?.querySelector('.logo-icon');
                if (logoIcon) {
                  gsap.to(logoIcon, {
                    rotation: 360,
                    duration: 0.6,
                    ease: "power2.out"
                  });
                }
              }}
              aria-label="DK Tax Consultants logo"
              tabIndex={0}
            >
              <Calculator className={`h-8 w-8 logo-icon transition-colors duration-300 ${
                isScrolled ? 'text-blue-600' : 'text-white'
              }`} />
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                DK Tax Consultants
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav ref={navRef} className="hidden md:flex space-x-8" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`font-medium transition-all duration-300 relative group ${
                    isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
                  }`}
                  aria-label={item.name}
                  tabIndex={0}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { 
                      y: -2, 
                      duration: 0.3, 
                      ease: "power2.out" 
                    });
                    gsap.to(e.currentTarget.querySelector('span'), {
                      width: '100%',
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      y: 0, 
                      duration: 0.3, 
                      ease: "power2.out" 
                    });
                    gsap.to(e.currentTarget.querySelector('span'), {
                      width: 0,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-150"></span>
                </a>
              ))}
            </nav>

            {/* Contact Info */}
            <div ref={contactRef} className="hidden lg:flex items-center space-x-4" aria-label="Contact information">
              <div 
                className="flex items-center space-x-1 group cursor-pointer"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
                aria-label="Phone number"
                tabIndex={0}
              >
                <Phone className={`h-4 w-4 transition-colors duration-300 ${
                  isScrolled ? 'text-blue-600' : 'text-white'
                }`} />
                <span className={`text-sm transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}>
                  +91 98738 19147
                </span>
              </div>
              <div 
                className="flex items-center space-x-1 group cursor-pointer"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
                aria-label="Email address"
                tabIndex={0}
              >
                <Mail className={`h-4 w-4 transition-colors duration-300 ${
                  isScrolled ? 'text-blue-600' : 'text-white'
                }`} />
                <span className={`text-sm transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}>
                  dkaccounts@gmail.com
                </span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative z-50 p-2"
              onClick={handleMobileMenuToggle}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
              }}
            >
              {isMenuOpen ? (
                <X className={`h-6 w-6 transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`} />
              ) : (
                <Menu className={`h-6 w-6 transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={overlayRef}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
        tabIndex={-1}
      />

      {/* Mobile Navigation Menu */}
      <div 
        ref={mobileMenuRef}
        id="mobile-menu"
        className="fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 z-50 md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white border-opacity-20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="h-8 w-8 text-white" />
              <div>
                <h3 className="text-white font-bold text-lg">DK Tax Consultants</h3>
                <p className="text-blue-200 text-sm">Dhiraj Kumar Pandey</p>
              </div>
            </div>
            <button
              className="ml-auto p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Navigation Items */}
         <div className="flex-1 py-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="mobile-nav-item flex items-center space-x-4 px-6 py-4 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                aria-label={item.name}
                tabIndex={0}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-lg font-medium">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="p-6 border-t border-white border-opacity-20">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-blue-200" aria-label="Phone number">
                <Phone className="h-5 w-5" />
                <span>+91 98738 19147</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-200" aria-label="Email address">
                <Mail className="h-5 w-5" />
                <span>dkaccounts@gmail.com</span>
              </div>
            </div>
            <button 
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg"
              onClick={() => {
                window.open('https://wa.me/919873819147?text=Hello, I would like to get consultation', '_blank');
                setIsMenuOpen(false);
              }}
              aria-label="Get Consultation on WhatsApp"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
              }}
            >
              Get Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;