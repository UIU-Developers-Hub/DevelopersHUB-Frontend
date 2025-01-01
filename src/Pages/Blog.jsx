import React, { useState } from "react";
import {
  FaUpload,
  FaImage,
  FaRegSmile,
  FaUserCircle,
  FaTimes,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaShareAlt,
} from "react-icons/fa";
import { useBlogs } from "../Context_apis/BlogContext"; // Import your BlogContext

export default function Blog() {
  const { blogs, loading } = useBlogs(); // Using the context to fetch blogs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [feeling, setFeeling] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleFeelingChange = (e) => {
    setFeeling(e.target.value);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setFeeling("");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 min-h-screen gap-4">
      {/* Left Section */}
      <div className="col-span-3 bg-gray-100 p-4 flex flex-col items-center sticky top-0 h-screen">
        <div className="flex items-center mb-6">
          <FaUserCircle size={40} className="text-gray-600" />
          <span className="ml-3 font-semibold text-gray-800 text-lg">
            John Doe
          </span>
        </div>
        <div className="space-y-4 w-full">
          <button className="btn btn-outline btn-block">Followers</button>
          <button className="btn btn-outline btn-block">Saved Posts</button>
          <button className="btn btn-outline btn-block">Popular People</button>
        </div>
      </div>

      {/* Middle Section */}
      <div className="col-span-6 mx-auto flex flex-col items-center space-y-6">
        {/* Add Blog Section */}
        <div className="bg-white p-4 rounded-lg shadow-md w-3/4 border border-gray-200">
          <div className="flex justify-start items-center gap-4 mb-4">
            <FaUserCircle size={40} className="text-gray-600" />
            <input
              type="text"
              className="input input-bordered w-full p-4 text-lg"
              placeholder="What's on your mind?"
              onFocus={handleOpenModal}
            />
          </div>

          <div className="flex justify-center items-center space-x-4">
            {/* Photo/Video and Feeling/Activity buttons */}
            <button
              className="flex items-center text-blue-500"
              onClick={handleOpenModal}
            >
              <FaImage size={20} className="mr-1" /> Photo/Video
            </button>
            <button
              className="flex items-center text-blue-500"
              onClick={handleOpenModal}
            >
              <FaRegSmile size={20} className="mr-1" /> Feeling/Activity
            </button>
          </div>
        </div>

        {/* Blog Cards */}
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-6 rounded-lg shadow-md w-3/4 border border-gray-200"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <FaUserCircle size={30} className="text-gray-600" />
              <div className="">
                <span className=" text-gray-800 font-semibold">
                  {blog.user}
                </span>
                <p className="text-gray-400">{blog.date}</p>
              </div>
            </div>
            {/* Description */}
            <div className="mb-4 text-gray-700">{blog.description}</div>
            {/* Image */}
            <div className="mb-4">
              <img src={blog.image} alt="Post" className="rounded-lg w-full" />
            </div>
            {/* Stats */}
            <div className="flex justify-around items-center text-gray-600 mb-4">
              <span>{blog.upvotes} Upvotes</span>
              <span>{blog.downvotes} Downvotes</span>
              <span>{blog.discussions} Discussions</span>
              <span>{blog.shares} Shares</span>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center justify-around">
              <button className="btn btn-sm btn-outline flex items-center gap-2">
                <FaThumbsUp /> Upvote
              </button>
              <button className="btn btn-sm btn-outline flex items-center gap-2">
                <FaThumbsDown /> Downvote
              </button>
              <button className="btn btn-sm btn-outline flex items-center gap-2">
                <FaComment /> Discuss
              </button>
              <button className="btn btn-sm btn-outline flex items-center gap-2">
                <FaShareAlt /> Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="col-span-3 bg-gray-100 p-4 flex flex-col items-center sticky top-0 h-screen">
        <h3 className="text-lg font-semibold mb-4">Active Followers</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, idx) => (
            <FaUserCircle key={idx} size={40} className="text-gray-600" />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Create a Post
              </h2>
              <FaTimes
                size={20}
                className="text-gray-600 cursor-pointer"
                onClick={handleModalClose}
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="What's on your mind?"
                value={feeling}
                onChange={handleFeelingChange}
                className="input input-bordered w-full p-4 text-lg"
              />
            </div>
            {/* Image Upload Section */}
            <div className="mb-4">
              <label
                htmlFor="file-upload"
                className="block text-lg font-medium text-gray-700 mb-2 cursor-pointer"
              >
                Upload an Image
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:border-blue-500 transition-all duration-200">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center text-gray-500">
                  <FaUpload size={40} />
                  <span className="mt-2">Click or drag to upload</span>
                </div>
              </div>
              {selectedImage && (
                <div className="mt-4">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-outline bg-blue-500 text-white"
                onClick={() => alert("Post Created!")}
              >
                Post
              </button>
              <button
                className="btn btn-outline text-gray-500"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
