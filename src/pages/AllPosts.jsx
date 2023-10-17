import { useState, useEffect } from "react";
import appwriteService from "../../Appwrite/database";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const [allPost, setAllPost] = useState(null);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (posts.length > 0) {
        setAllPost(posts);
    } else {
      appwriteService
        .getPosts()
        .then((posts) => {
          if (posts) {
            setAllPost(posts.documents);
            console.log("service returned")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="w-full my-16">
      <Container>
        <div className="flex flex-wrap justify-center items-center  w-full lg:gap-32 md:gap-32 gap-8">
          {allPost &&
            allPost.map((post) => (
              <div
                key={post.$id}
                className="w-[300px] flex  justify-center items-center "
              >
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
