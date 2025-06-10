import React from 'react';
import Image from 'next/image';

const Author = ({ author }) => (
  <div className="flex items-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
  <div className="flex-shrink-0">
    <Image
      unoptimized
      alt={author.name}
      height={100}
      width={100}
      className="rounded-full"
      src={author.photo?.url}
    />
  </div>
  <div className="ml-6"> {/* Added margin-left to move the text to the right */}
    <h3 className="text-white text-xl font-bold">{author.name}</h3>
    <p className="text-white text-ls">{author.bio}</p>
  </div>
</div>
);

export default Author;
