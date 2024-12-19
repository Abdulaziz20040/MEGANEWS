import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import { BiMessageRoundedDots } from "react-icons/bi";
import "./detals.css";

interface CommentType {
  username: string;
  comment: string;
  commentDate: string;
  userimg?: string;
}

interface CommentProps {
  id: string;
}

const Comment: React.FC<CommentProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [formData, setFormData] = useState({ name: "", comment: "" });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://df2174b8e5e5a31d.mokky.dev/MEGA_news`
      );
      const fetchedComments = res.data?.[0]?.comment;
      if (Array.isArray(fetchedComments)) {
        setComments(fetchedComments);
      } else {
        setError("No valid comments found in the response.");
      }
    } catch (err) {
      setError("Failed to load comments. Please try again later.");
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        username: formData.name,
        userimg:
          "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid",
        comment: formData.comment,
        commentDate: new Date().toLocaleString(),
      };

      const response = await axios.post(
        `https://df2174b8e5e5a31d.mokky.dev/MEGA_news`,
        payload
      );

      console.log("Izoh muvaffaqiyatli qo'shildi:", response.data);

      // Update the comments state with the new comment
      setComments((prevData) => [...prevData, payload]);

      setFormData({ name: "", comment: "" });
    } catch (err: any) {
      console.error("Izoh qo'shishda xato:", err.response);
      setError("Izohni qo'shib bo'lmadi");
    } finally {
      setLoading(false);
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
        {comments.length > 0 ? (
          comments.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full mb-4"
            >
              <div className=" flex items-center gap-2">
                {item.userimg && (
                  <img
                    src={item.userimg}
                    alt={item.username}
                    className="w-10 h-11 rounded-full object-cover"
                  />
                )}
                <div>
                  {" "}
                  <p className="text-sm text-gray-600">{item.commentDate}</p>
                  <h1 className="font-bold">{item.username}</h1>
                  <p className="text-sm">{item.comment}</p>
                </div>
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
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 h-[150px] border border-gray-300 rounded-md"
                placeholder="Enter your comment"
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#F81539BF] flex items-center gap-1 py-2 px-4 text-white rounded-xl"
          >
            <BiMessageRoundedDots className="text-[20px]" />
            Send Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
