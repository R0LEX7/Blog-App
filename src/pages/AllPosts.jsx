import {useState , useEffect} from 'react'
import appwriteService from '../../Appwrite/database';
import {Container, PostCard} from "../components/index"
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";

const AllPosts = () => {

    

    const posts = useSelector(state => state.posts.posts);

  return (
    <div className='w-full my-16'>
        <Container>
            <div className='flex flex-wrap justify-center items-center  w-full lg:gap-32 md:gap-32 gap-8'>
                {posts && posts.map((post) => (
                    <motion.div  key = {post.$id} className='w-[300px] flex  justify-center items-center '
                    
                    >

                        <PostCard {...post}/>
                    </motion.div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
