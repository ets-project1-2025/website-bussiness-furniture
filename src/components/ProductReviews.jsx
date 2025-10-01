// src/components/ProductReviews.jsx
import React, { useState, useEffect } from 'react';
import { getReviewsByProduct, createReview, getAverageRatingByProduct } from '../lib/admin-api';
import { getCurrentUser } from '../lib/auth';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data ulasan saat komponen dimuat
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const reviewsData = await getReviewsByProduct(productId);
        const avgRating = await getAverageRatingByProduct(productId);
        
        setReviews(reviewsData);
        setAverageRating(avgRating);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchReviews();
    fetchUser();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Anda harus login untuk memberikan ulasan');
      return;
    }

    try {
      const reviewData = {
        product_id: productId,
        user_id: user.id,
        rating: parseInt(newReview.rating),
        comment: newReview.comment
      };

      const createdReview = await createReview(reviewData);
      setReviews(prev => [createdReview, ...prev]);
      
      // Update average rating
      const newAvg = await getAverageRatingByProduct(productId);
      setAverageRating(newAvg);
      
      // Reset form
      setNewReview({ rating: 5, comment: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Memuat ulasan...</div>;
  if (error) return <div>Terjadi kesalahan: {error}</div>;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Ulasan Produk</h2>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[var(--furniture-brown)] mr-2">{averageRating.toFixed(1)}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600 ml-2">({reviews.length} ulasan)</span>
        </div>
      </div>

      {/* Form untuk menambah ulasan */}
      {user ? (
        <form onSubmit={handleSubmitReview} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tulis Ulasan Anda</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className={`w-10 h-10 rounded-full ${
                    newReview.rating === rating
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
              Komentar
            </label>
            <textarea
              id="comment"
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--furniture-brown)] focus:border-[var(--furniture-brown)]"
              placeholder="Bagikan pengalaman Anda dengan produk ini..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn-primary"
          >
            Kirim Ulasan
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
          <p className="text-gray-600">Anda harus login untuk memberikan ulasan</p>
          <a href="/akun/login" className="text-[var(--furniture-brown)] hover:underline">Masuk di sini</a>
        </div>
      )}

      {/* Daftar ulasan */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                {review.user.avatar_url ? (
                  <img
                    src={review.user.avatar_url}
                    alt={review.user.full_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600">
                      {review.user.full_name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h4 className="font-semibold text-gray-900">{review.user.full_name}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
                
                <div className="flex items-center mt-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;