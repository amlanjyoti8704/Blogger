import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../Context/appContext.jsx';

function CreatePost() {
  const { backendURL, userToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      dataToSend.append('category', formData.category);
      dataToSend.append('content', formData.content);
      if (file) dataToSend.append('image', file);

      const { data } = await axios.post(
        `${backendURL}/api/post/create`,
        dataToSend,
        {
          headers: {
            token: userToken,
          },
        }
      );

      navigate(`/post/${data.post.slug}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */

  return (
    <div className="max-w-2xl mx-auto p-6 dark:text-gray-300">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create New Post
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Post title"
          value={formData.title}
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
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="content"
          placeholder="Write your post..."
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
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;