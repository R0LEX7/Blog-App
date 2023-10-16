import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PostCard from "../Cards/PostCard";


const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

const PostCarousel = ({posts}) => {
  return (
    <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        
        
        >
        
        {posts && posts.map((post) => (
          <div
            key={post.$id}
            className="  flex items-center justify-center p-0   mt-16 lg:mt-0 md:mt-0 "
          >
            <PostCard {...post} />
          </div>
        ))}
        
      </Carousel>
  )
}

export default PostCarousel
