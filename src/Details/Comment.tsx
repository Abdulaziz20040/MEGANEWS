import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import { BiMessageRoundedDots } from "react-icons/bi";
import "./detals.css";

interface CommentType {
  username: string;
  commet: string;
  commentDate: string;
  userimg?: string;
}

const Comment: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://df2174b8e5e5a31d.mokky.dev/MEGA_news"
      );
      console.log("API Response:", res.data);
      if (res.data && res.data[0] && res.data[0].comment) {
        setComments(res.data[0].comment);
      } else {
        console.log("No comments field found in the response");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (newData) => {
    try {
      const response = await axios.post(
        "https://966ba871b82a20db.mokky.dev/test",
        newData
      );
      setComments((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error("Ma'lumot yaratishda xatolik:", error);
    }
  };
  return (
    <div className="comment-section">
      <div className="comment-header mb-4">
        <div className="flex items-center mb-2">
          <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
          <h3 className="text-lg font-semibold">Comments</h3>
        </div>
      </div>

      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        {comments && comments.length > 0 ? (
          comments.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full mb-4"
            >
              <div>
                {item.userimg && (
                  <img
                    src={item.userimg}
                    alt={item.username}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <h1 className="font-bold">{item.username}</h1>
                <p className="text-sm text-gray-600">{item.commentDate}</p>
                <p className="text-sm">{item.commet}</p>
              </div>
              <button className="flex items-center text-sm text-blue-500 mt-2 bg-[#3E32320D] px-4 py-2 rounded-lg hover:bg-[#3E32320D] transition duration-300">
                <FaReply className="mr-2 text-blue-500" />
                Reply
              </button>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <div className="add-comment-form mt-6">
        <div className="flex items-center mb-2">
          <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
          <h3 className="text-lg font-semibold">Add a comment</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={handleChange}
                className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={handleChange}
                className="block w-full mt-2 h-[207px] px-3 py-2 outline-none bg-[#F5F5F5] rounded-md"
                placeholder="Enter your comment"
                required
              ></textarea>
            </div>
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="w-[19%]">
              <button
                type="submit"
                className="bg-[#F81539BF] h-[55px] w-[170px] flex items-center gap-1 py-2 px-4 text-white rounded-xl"
              >
                <BiMessageRoundedDots className="text-[20px]" />
                Send Comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
