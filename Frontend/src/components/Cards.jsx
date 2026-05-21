import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="mt-4 my-3 p-3 cursor-pointer"
      onClick={() => navigate(`/books/${item._id}`)}
    >
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img src={item.image} alt={item.name} className="h-56 w-full object-cover" />
        </figure>
        <div className="card-body">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="card-title text-lg">
                {item.name}
                <div className="badge badge-secondary ml-2">{item.category}</div>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">by {item.author}</p>
            </div>
            <div className="badge badge-outline text-base">${item.price}</div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{item.title}</p>
          <p className="text-sm my-3 text-gray-700 dark:text-gray-200 line-clamp-3">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2 justify-between items-center pt-3">
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-outline">{item.pages} pages</span>
              <span className="badge badge-outline">{item.language}</span>
              <span className="badge badge-outline">{item.format}</span>
            </div>
            <div className="badge badge-info">{item.rating} ★</div>
          </div>
          <div className="card-actions justify-end pt-3">
            {item.buyLink ? (
              <a
                href={item.buyLink}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-block px-4 py-2 rounded-full border-[2px] border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white duration-200"
              >
                Buy Now
              </a>
            ) : (
              <span className="inline-block px-4 py-2 rounded-full border-[2px] border-gray-400 text-gray-500">
                Buy link unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
