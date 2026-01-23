import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../Context/appContext.jsx';

function EditPost() {
  const { backendURL, userToken, currentPost, setCurrentPost } = useContext(AppContext);

  const { postId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    content: '',
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* ---------- load post (refresh-safe) ---------- */
  useEffect(() => {
    const loadPost = async () => {
      // 1️⃣ If coming from ManagePosts (fast path)
      if (currentPost && currentPost._id === postId) {
        setFormData({
          title: currentPost.title,
          author: currentPost.author,
          category: currentPost.category,
          content: currentPost.content,
        });
        return;
      }

      // 2️⃣ If page refreshed → fetch from backend
      try {
        const { data } = await axios.get(
          `${backendURL}/api/post/getposts?postId=${postId}`
        );

        const post = data.posts[0];
        if (!post) throw new Error('Post not found');

        setCurrentPost(post);
        setFormData({
          title: post.title,
          author: post.author,
          category: post.category,
          content: post.content,
        });
      } catch (err) {
        setError('Failed to load post');
      }
    };

    loadPost();
  }, [postId]);

  /* ---------- handlers ---------- */

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('author', formData.author);
      dataToSend.append('category', formData.category);
      dataToSend.append('content', formData.content);
      if (file) dataToSend.append('image', file);

      await axios.put(
        `${backendURL}/api/post/updatepost/${postId}`,
        dataToSend,
        {
          headers: {
            token: userToken,
          },
        }
      );

      navigate(`/post/${currentPost.slug}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */

  return (
    <div className="max-w-2xl mx-auto p-6 dark:text-gray-300">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Edit Post
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          className="border p-2 rounded h-40"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
        >
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}

export default EditPost;