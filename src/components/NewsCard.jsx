import React from "react";

const NewsCard = ({ title, description, url,source, author, publishedAt }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">{source}</span>
        
        <span className="text-xs text-gray-500">{new Date(publishedAt).toLocaleDateString()}</span>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 text-blue-600 hover:underline text-sm"
      >
        Read more →
      </a>
    </div>
  );
};

export default NewsCard;
