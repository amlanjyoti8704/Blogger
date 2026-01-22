import { useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AppContext } from '../Context/appContext.jsx';
import PostCard from '../Components/postCard.jsx';

function Posts() {
  const { posts, fetchPosts, userData } = useContext(AppContext);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="max-w-6xl mx-auto min-h-screen dark:text-gray-200">
      <h1 className="text-3xl font-semibold text-center mb-8">
        All Blog Posts
      </h1>

      {posts?.length === 0 && (
        <p className="text-center text-gray-500">
          No posts found.
        </p>
      )}

      <div className="flex flex-wrap gap-6 justify-center">
        {posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      {userData && (
        <div className="text-center mt-10">
          <NavLink
            to="/create-post"
            className="text-teal-500 hover:underline"
          >
            Create a new post →
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Posts;