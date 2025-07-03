import React, { useState, useEffect, useRef } from 'react';
import { Star, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, writeBatch, doc, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  service?: string;
  timestamp: any;
  isPredefined?: boolean;
}

const AllReviews = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    rating: 0,
    message: '',
    service: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const services = [
    'Company Formation',
    'GST Registration',
    'Tax Planning',
    'Audit Services',
    'Other Services'
  ];

  // Initialize predefined reviews if they don't exist
  const initializePredefinedReviews = async () => {
    const predefinedReviews = [
      {
        name: 'Rajesh Kumar',
        rating: 5,
        message: 'Excellent service! Dhiraj sir helped us register our company smoothly and efficiently.',
        service: 'Company Formation',
        isPredefined: true
      },
      {
        name: 'Priya Sharma',
        rating: 5,
        message: 'Very professional and knowledgeable. Made GST registration process very simple.',
        service: 'GST Registration',
        isPredefined: true
      },
      {
        name: 'Amit Patel',
        rating: 5,
        message: 'Great tax planning advice that saved us significant amount. Highly recommended!',
        service: 'Tax Planning',
        isPredefined: true
      },
      {
        name: 'Sunita Gupta',
        rating: 4,
        message: 'Professional audit services with detailed reporting. Very satisfied with the work.',
        service: 'Audit Services',
        isPredefined: true
      },
      {
        name: 'Vikram Singh',
        rating: 5,
        message: 'Quick and accurate tax filing. No hassles, everything was handled professionally.',
        service: 'Other Services',
        isPredefined: true
      }
    ];

    const batch = writeBatch(db);
    const existingReviews = await getDocs(collection(db, 'reviews'));
    
    // Only add predefined reviews if they don't exist
    predefinedReviews.forEach(predefined => {
      const exists = existingReviews.docs.some(doc => 
        doc.data().name === predefined.name && 
        doc.data().message === predefined.message
      );
      if (!exists) {
        const docRef = doc(collection(db, 'reviews'));
        batch.set(docRef, {
          ...predefined,
          timestamp: serverTimestamp()
        });
      }
    });
    
    await batch.commit();
  };

  // Animation effects
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

      gsap.fromTo(testimonialsRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
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
  }, [reviews]);

  // Load reviews from Firestore
  useEffect(() => {
    const loadReviews = async () => {
      try {
        await initializePredefinedReviews();
        
        const q = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, 
          (querySnapshot) => {
            const reviewsData: Review[] = [];
            querySnapshot.forEach((doc) => {
              const timestamp = doc.data().timestamp?.toDate() || new Date();
              reviewsData.push({ 
                id: doc.id, 
                name: doc.data().name,
                rating: doc.data().rating,
                message: doc.data().message,
                service: doc.data().service || 'Other Services',
                timestamp: timestamp,
                isPredefined: doc.data().isPredefined || false
              });
            });
            setReviews(reviewsData);
            setLoading(false);
          },
          (error) => {
            console.error("Error loading reviews:", error);
            setSubmitError("Failed to load reviews. Please refresh the page.");
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error in review loading:", error);
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!feedbackData.name.trim()) {
      setSubmitError("Please enter your name");
      return;
    }
    if (feedbackData.rating === 0) {
      setSubmitError("Please select a rating");
      return;
    }
    if (!feedbackData.message.trim()) {
      setSubmitError("Please write your review");
      return;
    }

    setFormLoading(true);
    setSubmitError('');
    
    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        name: feedbackData.name.trim(),
        rating: feedbackData.rating,
        message: feedbackData.message.trim(),
        service: feedbackData.service || 'Other Services',
        timestamp: serverTimestamp()
      });

      // Optimistically update local state
      setReviews(prev => [{
        id: docRef.id,
        name: feedbackData.name.trim(),
        rating: feedbackData.rating,
        message: feedbackData.message.trim(),
        service: feedbackData.service || 'Other Services',
        timestamp: new Date()
      }, ...prev]);

      // Reset form
      setFeedbackData({
        name: '',
        rating: 0,
        message: '',
        service: ''
      });
      
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);

    } catch (error) {
      console.error("Error adding review: ", error);
      setSubmitError("Failed to submit review. Please check your connection and try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating: number) => {
    setFeedbackData(prev => ({
      ...prev,
      rating
    }));
    setSubmitError('');
  };

  const handleStarHover = (rating: number) => {
    setHoveredStar(rating);
  };

  const calculateStats = () => {
    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0';
    const satisfactionRate = totalReviews > 0 
  ? Math.round((reviews.filter(r => r.rating >= 4).length / totalReviews) * 100) 
  : 0;
    return {
      totalReviews,
      averageRating,
      satisfactionRate
    };
  };

  const stats = calculateStats();

  return (
    <section ref={sectionRef} id="reviews" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer <span className="text-blue-600">Reviews</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your experience with our services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Review Form */}
          <div ref={formRef} className="bg-white rounded-3xl p-8 shadow-lg transform-gpu">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave Your Review</h3>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                <span>Thank you! Your review has been submitted successfully.</span>
              </div>
            )}
            
            {submitError && (
              <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={feedbackData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating *
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
                  onChange={handleInputChange}
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
                  Your Review *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={feedbackData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Share your experience..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg relative overflow-hidden group transition-all duration-300 hover:shadow-xl disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {formLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Send className="h-5 w-5" />
                    <span>Submit Review</span>
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What People Say</h3>
              <p className="text-gray-600">Read experiences from our customers</p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600">Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <>
                <div ref={testimonialsRef} className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="flex space-x-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          {review.service && (
                            <p className="text-sm text-blue-600 mb-2">{review.service}</p>
                          )}
                          <p className="text-gray-700">{review.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {review.timestamp.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllReviews;