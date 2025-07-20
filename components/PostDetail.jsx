/*import React from 'react';

import moment from 'moment';

const PostDetails = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img src={post.featuredImage?.url} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={post.author.name}
                height={30}
                width={30}
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item));

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>

    </>
  );
};

export default PostDetails; */

import React from 'react';
import moment from 'moment';

const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

const PostDetails = ({ post }) => {

 const getContentFragment = (index, text, obj, type) => {
  let modifiedText = text;

  if (typeof text === 'string' && isValidUrl(text)) {
    modifiedText = (
      <a key={index} href={text} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-words">
        {text}
      </a>
    );
  }

  if (obj) {
    if (obj.bold) {
      modifiedText = (<b key={index}>{text}</b>);
    }
    if (obj.italic) {
      modifiedText = (<em key={index}>{text}</em>);
    }
    if (obj.underline) {
      modifiedText = (<u key={index}>{text}</u>);
    }
    if (obj.code) {
      modifiedText = (<code key={index} className="bg-gray-200 px-1 rounded text-sm">{text}</code>);
    }
  }

  switch (type) {
    case 'heading-one':
      return (
        <h1 key={index} className="text-4xl font-bold mb-6">
          {modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 key={index} className="text-3xl font-semibold mb-5">
          {modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
        </h2>
      );
    case 'heading-three':
      return (
        <h3 key={index} className="text-2xl font-semibold mb-4">
          {modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
        </h3>
      );
    case 'heading-four':
      return (
        <h4 key={index} className="text-xl font-semibold mb-3">
          {modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
        </h4>
      );
   case 'paragraph':
  const isCodeBlock = obj?.children?.every(child => child.code);
  return isCodeBlock ? (
    <pre key={index} className="bg-gray-100 p-4 rounded mb-6 overflow-x-auto text-sm">
      <code>
        {obj.children.map((child, i) => (
          <div key={i}>{child.text}</div>
        ))}
      </code>
    </pre>
  ) : (
    <p key={index} className="text-base mb-6 leading-relaxed">
      {modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
    </p>
  );
      
    case 'code_block':
  return (
    <pre key={index} className="bg-gray-100 text-sm font-mono rounded p-4 my-4 overflow-x-auto">
      <code>
        {obj.children?.map((line, i) => (
          <div key={i}>{line.text}</div>
        ))}
      </code>
    </pre>
  );
    case 'image':
      return (
        <img
          key={index}
          alt={obj.title || 'image'}
          height={obj.height}
          width={obj.width}
          src={obj.src || '/default-image.png'}
        />
      );
    default:
      return modifiedText;
  }
};

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        {post.featuredImage?.url ? (
          <img
            src={post.featuredImage.url}
            alt={post.title || 'Featured'}
            className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          />
        ) : (
          <div className="h-60 bg-gray-300 w-full flex items-center justify-center text-gray-500 rounded-t-lg lg:rounded-lg">
            No image
          </div>
        )}
      </div>

      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
            {post.author?.photo?.url ? (
              <img
                alt={post.author.name}
                height={30}
                width={30}
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
            ) : (
              <div className="w-[30px] h-[30px] bg-gray-400 rounded-full flex items-center justify-center text-xs text-white">
                N/A
              </div>
            )}
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
              {post.author.name}
            </p>
          </div>

          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>

        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>

        {post.content?.raw?.children?.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item, item.type)
          );
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetails;