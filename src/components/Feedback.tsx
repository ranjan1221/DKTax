import React, { useState, useEffect, useRef } from 'react';
import { Star, Send, CheckCircle, ThumbsUp, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../Firebase';
import { MessageSquare } from 'lucide-react';  // Make sure this import exists

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id: string;
  name: string;
  email?: string;
  service?: string;
  rating: number;
  message: string;
  avatar: string;
  date: Date;
}

const Feedback = () => {
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    rating: 0,
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout>();
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Load reviews from Firestore
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'), 
          orderBy('date', 'desc'), 
          limit(5)
        );
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const reviewsData: Review[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            reviewsData.push({ 
              id: doc.id,
              name: data.name,
              email: data.email,
              service: data.service,
              rating: data.rating,
              message: data.message,
              avatar: data.avatar || data.name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
              date: data.date?.toDate() || new Date()
            });
          });
          setReviews(reviewsData);
          setLoading(false);
        });
        
        return unsubscribe;
      } catch (error) {
        console.error("Error loading reviews:", error);
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (reviews.length > 1) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % reviews.length);
      }, 5000);
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [reviews.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(formRef.current,
        { opacity: 0, x: -50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(testimonialsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!feedbackData.name.trim()) return;
    if (feedbackData.rating === 0) return;
    if (!feedbackData.message.trim()) return;

    try {
      const newReview = {
        name: feedbackData.name.trim(),
        email: feedbackData.email.trim(),
        service: feedbackData.service || 'Other Services',
        rating: feedbackData.rating,
        message: feedbackData.message.trim(),
        avatar: feedbackData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        date: serverTimestamp()
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'reviews'), newReview);
      
      // Optimistically update local state
      setReviews(prev => [{
        ...newReview,
        id: docRef.id,
        date: new Date()
      }, ...prev.slice(0, 4)]);

      setIsSubmitted(true);
      
      // Success animation
      gsap.to('.success-message', {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
        yoyo: true,
        repeat: 1
      });

      // Reset form
      setFeedbackData({
        name: '',
        email: '',
        rating: 0,
        service: '',
        message: ''
      });
      
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value
    });
  };

  const handleStarClick = (rating: number) => {
    setFeedbackData({ ...feedbackData, rating });
  };

  const handleStarHover = (rating: number) => {
    setHoveredStar(rating);
  };

  const services = [
    'Company Formation',
    'GST Registration',
    'Income Tax Filing',
    'Audit & Assurance',
    'Business License',
    'Tax Planning',
    'Other Services'
  ];

  const handleInputFocus = (e: React.FocusEvent) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonHover = (e: React.MouseEvent, isEntering: boolean) => {
    const button = e.currentTarget;
    const icon = button.querySelector('.send-icon');
    
    if (isEntering) {
      gsap.to(button, {
        scale: 1.05,
        y: -3,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(icon, {
        x: 5,
        rotation: 15,
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
      gsap.to(icon, {
        x: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleTestimonialHover = (e: React.MouseEvent, isEntering: boolean) => {
    const testimonial = e.currentTarget;
    
    if (isEntering) {
      gsap.to(testimonial, {
        y: -10,
        scale: 1.02,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(testimonial, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleShowMoreReviews = () => {
    navigate('/reviews');
  };
  const handleHover = (isHovering: boolean) => (e: React.MouseEvent<HTMLDivElement>) => {
  const target = e.currentTarget;
  gsap.to(target, {
    y: isHovering ? -10 : 0,
    scale: isHovering ? 1.02 : 1,
    duration: 0.3
  });
};

 const calculateStats = () => {
  const totalReviews = reviews.length;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0';
  const satisfactionRate = totalReviews > 0 
    ? Math.round((reviews.filter(r => r.rating >= 4).length / totalReviews * 100))
    : 0;
  
  return {
    totalReviews,
    averageRating,
    satisfactionRate
  };
};

  const stats = calculateStats();

  return (
    <section ref={sectionRef} id="feedback" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Share Your <span className="text-blue-600">Feedback</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your feedback helps us improve our services and serve you better. We value your opinion!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Feedback Form */}
          <div ref={formRef} className="bg-white rounded-3xl p-8 shadow-lg transform-gpu">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Leave Your Feedback</h3>
            </div>
            
            {isSubmitted && (
              <div className="success-message bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-xl mb-6 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Thank you! Your feedback has been submitted successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={feedbackData.name}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={feedbackData.email}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Your Experience *
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={() => handleStarHover(0)}
                      className="focus:outline-none transition-transform duration-200 hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredStar || feedbackData.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        } transition-colors duration-200`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Used
                </label>
                <select
                  id="service"
                  name="service"
                  value={feedbackData.service}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={feedbackData.message}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Share your experience with us..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg relative overflow-hidden group"
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Send className="h-5 w-5 send-icon" />
                  <span>Submit Feedback</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>

          {/* Client Testimonials */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What Our Clients Say</h3>
              <p className="text-gray-600">
                Read what our satisfied clients have to say about our services
              </p>
            </div>

            <div ref={testimonialsRef} className="relative h-96 overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : reviews.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No reviews yet. Be the first to share your experience!
                </div>
              ) : (
                <>
                  {reviews.map((testimonial, index) => (
                    <div 
                      key={testimonial.id} 
                      className={`absolute inset-0 transition-opacity duration-500 flex items-center ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div
  className="bg-white rounded-2xl p-6 shadow-lg w-full cursor-pointer transform-gpu"
  onMouseEnter={handleHover(true)}
  onMouseLeave={handleHover(false)}
>
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                            {testimonial.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                              <div className="flex space-x-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            {testimonial.service && (
                              <p className="text-sm text-blue-600 mb-2">{testimonial.service}</p>
                            )}
                            <p className="text-gray-700 text-sm leading-relaxed">{testimonial.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {testimonial.date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Navigation controls */}
                  {reviews.length > 1 && (
                    <>
                      <button 
                        onClick={() => setCurrentSlide(prev => (prev - 1 + reviews.length) % reviews.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => setCurrentSlide(prev => (prev + 1) % reviews.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                      >
                        <ChevronRight className="h-6 w-6 text-blue-600" />
                      </button>
                      
                      {/* Navigation dots */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        {reviews.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Show More Button */}
            <div className="text-center">
              <button
                onClick={handleShowMoreReviews}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg relative overflow-hidden group transition-all duration-300"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, y: -3, duration: 0.3 });
                  gsap.to(e.currentTarget.querySelector('.arrow-icon'), { x: 5, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3 });
                  gsap.to(e.currentTarget.querySelector('.arrow-icon'), { x: 0, duration: 0.3 });
                }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Show More Reviews</span>
                  <ArrowRight className="h-5 w-5 arrow-icon" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{stats.totalReviews}</div>
                  <div className="text-sm opacity-90">Total Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.averageRating}</div>
                  <div className="text-sm opacity-90">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.satisfactionRate}%</div>
                  <div className="text-sm opacity-90">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;