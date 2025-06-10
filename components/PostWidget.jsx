import React, { useState, useEffect} from 'react'
import moment from 'moment';
import Link from 'next/link';
import { getSimilarPosts, getRecentPosts} from '../services';


const PostWidget = ({ categories, slug }) => {

  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if(slug) {
      getSimilarPosts(slug, categories || [])
      .then((result) => setRelatedPosts(result))
      .catch((error) => console.error("Error fetching similar posts:", error));
  } else {
    getRecentPosts()
      .then((result) => setRelatedPosts(result))
      .catch((error) => console.error("Error fetching recent posts:", error));
  }
}, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8w">
      <h3 className="text-xl mb-8 font-semibold border-b pb-2">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post, index) => (
      <div key={index} className="flex items-center w-full mb-4">
        <div className="w-16 flex-none">
          <img
            alt={post.title}
            height="60"
            width="60"
            className="align-middle rounded-full"
            src={post.featuredImage.url}
          />
        </div>
        <div className="ml-4">
          <p className="text-gray-500 text-sm">
            {moment(post.createdAt).format('DD MMM, YYYY')}
          </p>
          <Link href={`/post/${post.slug}`} className="text-md" key={index}>{post.title}
          </Link>
        </div>
      </div>
    ))}
  </div>
);
};

export default PostWidget
