import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  desc: string;
  img: string;
  toppost: boolean;
}

function ToppostDetails() {
  const [topPosts, setTopPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Post[]>("https://df2174b8e5e5a31d.mokky.dev/MEGA_news")
      .then((res) => {
        const filteredPosts = res.data.filter((post) => post.toppost === true);
        setTopPosts(filteredPosts);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load top posts. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading top posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="hide-scrollbar h-[500px] flex flex-col gap-4">
      {topPosts.length > 0 ? (
        topPosts.map((item) => (
          <Link to={`/details/${item.id}`}>
            <div key={item.id} className="flex items-center gap-4">
              <img
                className=" w-[130px] h-[80px] rounded-lg"
                src={item.img}
                alt={item.title}
              />
              <div className=" flex flex-col gap-1">
                <h2 className=" font-semibold line-clamp-2 text-[15px]">
                  {item.title}
                </h2>
                <span className=" text-stone-500 text-[14px]">Subhead</span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No top posts available at the moment.</p>
      )}
    </div>
  );
}

export default ToppostDetails;
