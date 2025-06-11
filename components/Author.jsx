import React from 'react';
import Image from 'next/image';

const Author = ({ author }) => (
  <div className="flex items-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
    <div className="flex-shrink-0">
      {author.photo?.url ? (
        <Image
          unoptimized
          alt={author.name}
          height={100}
          width={100}
          className="rounded-full"
          src={author.photo.url}
        />
      ) : (
        <div className="w-[100px] h-[100px] rounded-full bg-gray-700 flex items-center justify-center text-white text-sm">
          No Image
        </div>
      )}
    </div>

    <div className="ml-6">
      <h3 className="text-white text-xl font-bold">{author.name}</h3>
      <p className="text-white text-ls">{author.bio}</p>
    </div>
  </div>
);

export default Author;
