import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../Context/appContext.jsx';
import PostCard from '../Components/postCard.jsx';

function Post() {
  const { slug } = useParams();

  const {
    posts,
    currentPost,
    fetchPosts,
    fetchSinglePost,
    backendURL
  } = useContext(AppContext);

  /* -------------------- handlers -------------------- */



  /* -------------------- effects -------------------- */

  useEffect(() => {
    fetchPosts();
    fetchSinglePost(slug);
  }, [slug, fetchPosts, fetchSinglePost]);

  /* -------------------- render -------------------- */

  return (
    <main className="p-3 flex flex-col justify-center items-center max-w-6xl mx-auto min-h-screen dark:text-slate-200">
      {/* ----------- Post content ----------- */}
      {currentPost && (
        <>
          <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {currentPost.title}
          </h1>

          <img
            src={`${backendURL}${currentPost.image}`}
            alt={currentPost.title}
            className="mt-10 p-3 max-h-[600px] w-auto object-fill rounded-4xl"
          />

          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>
              {new Date(currentPost.createdAt).toLocaleDateString()}
            </span>
            <span className="italic">
              {(currentPost.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>

          <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html: currentPost.content }}
          />
        </>
      )}

      {/* ----------- Create Post Form ----------- */}
      {/* <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-2xl mx-auto w-full mt-10"
      >
        <input
          type="text"
          name="title"
          placeholder="Post title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2"
        />

        <textarea
          name="content"
          placeholder="Post content"
          value={formData.content}
          onChange={handleChange}
          required
          className="border p-2 h-40"
        />

        <button
          type="submit"
          className="bg-teal-500 text-white p-2 rounded"
        >
          Publish
        </button>
      </form> */}

      {/* ----------- Recent Posts ----------- */}
      {posts?.length > 0 && (
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          <h2 className="text-2xl font-semibold text-center">
            Recent posts
          </h2>

          <div className="flex flex-wrap gap-4">
            {posts
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
          </div>

          <Link
            to="/search"
            className="text-lg text-teal-500 hover:underline text-center"
          >
            View all posts
          </Link>
        </div>
      )}
    </main>
  );
}

export default Post;