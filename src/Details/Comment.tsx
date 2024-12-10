import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import { PiSmileyAngryLight, PiSmileyMehLight } from "react-icons/pi";
import { CgSmileMouthOpen } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { BiMessageRoundedDots } from "react-icons/bi";
import "./detals.css";

interface CommentType {
  userid: string;
  username: string;
  userimg: string;
  commet: string;
  commentDate: string;
}

const Comment: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")

      .then((res) => {
        if (res.data && res.data.comment) {
          setComments(res.data.comment);
        } else {
          setError("No comments found in the response.");
        }
        console.log("API Response:", res.data.comment[0]);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load comments. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newComment = {
      userid: Date.now().toString(),
      username: name,
      userimg: "https://your-default-avatar.jpg",
      commet: comment,
      commentDate: new Date().toLocaleDateString(),
    };

    try {
      await axios.post(
        "https://df2174b8e5e5a31d.mokky.dev/MEGA_news/comment",
        newComment
      );
      setComments((prevComments) => [newComment, ...prevComments]);
      setName("");
      setWebsite("");
      setEmail("");
      setComment("");
      setRating(0);
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Failed to submit your comment. Please try again later.");
    }
  };

  const handleRating = (rate: number) => {
    setRating(rate);
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
        {comments.map((item: CommentType) => (
          <div
            key={item.userid}
            className="user-comment mb-4 bg-[#F5F5F5] p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.userimg}
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex justify-between items-center w-full">
                <div>
                  <h4 className="font-semibold">{item.username}</h4>
                  <p className="text-sm text-gray-600">{item.commentDate}</p>
                </div>
                <button className="flex items-center text-sm text-blue-500 mt-2 bg-[#3E32320D] px-4 py-2 rounded-lg hover:bg-[#3E32320D] transition duration-300">
                  <FaReply className="mr-2 text-blue-500" />
                  Reply
                </button>
              </div>
            </div>
            <p className="mt-2">{item.commet}</p>
          </div>
        ))}
      </div>

      <div className="add-comment-form mt-6">
        <div className="flex items-center mb-2">
          <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
          <h3 className="text-lg font-semibold">Add a comment</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block w-full mt-2 h-[207px] px-3 py-2 outline-none bg-[#F5F5F5] rounded-md"
              placeholder="Enter your comment"
              required
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="w-full bg-[#F5F5F5] flex justify-between items-center py-2 px-4 rounded-[11px]">
            <span className="text-black">
              Rate the usefulness of the article:
            </span>
            <div className="flex items-center gap-3">
              <PiSmileyAngryLight
                onClick={() => handleRating(1)}
                className={`cursor-pointer ${
                  rating === 1 ? "text-[#FC5C65]" : ""
                }`}
              />
              <PiSmileyMehLight
                onClick={() => handleRating(2)}
                className={`cursor-pointer ${
                  rating === 2 ? "text-[#FA8231]" : ""
                }`}
              />
              <CgSmileMouthOpen
                onClick={() => handleRating(3)}
                className={`cursor-pointer ${
                  rating === 3 ? "text-[#F7B731]" : ""
                }`}
              />
              <MdFavoriteBorder
                onClick={() => handleRating(4)}
                className={`cursor-pointer ${
                  rating === 4 ? "text-[#45AAF2]" : ""
                }`}
              />
              <div>
                <button className="bg-[#26DE81] text-white flex items-center gap-1 p-2 rounded-xl">
                  <CgSmileMouthOpen />
                  good
                </button>
              </div>
            </div>
          </div>
          <div className="w-[19%]">
            <button
              onClick={handleSubmit}
              className="bg-[#F81539BF] h-[55px] w-[170px] flex items-center gap-1 py-2 px-4 text-white rounded-xl"
            >
              <BiMessageRoundedDots className="text-[20px]" />
              Send Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
