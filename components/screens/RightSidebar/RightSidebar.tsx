import React from "react";

const RightSidebar: React.FC = () => {
  return (
    <aside
      className="w-80 min-w-[18rem] max-w-sm bg-gray-900 text-gray-200 px-4 py-6 rounded-l-2xl shadow-xl"
      aria-label="Right sidebar"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-wide">Trending & Tips</h3>
        <span className="text-xs text-gray-400">Today</span>
      </div>

      {/* Scrollable cards area */}
      <div className="space-y-4 overflow-y-auto max-h-[72vh] pr-2">
        {/* Card 1 */}
        <article className="bg-gray-800 rounded-2xl p-4 flex flex-col gap-4 shadow-md">
          <div className="rounded-lg overflow-hidden h-36 flex items-center justify-center bg-gray-700">
            <img
              src="/assets/card-movies.jpg"
              alt="movies"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-sm text-gray-300">
            <p className="leading-relaxed">
              Watch the latest trending movies and series.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm font-medium text-indigo-300 hover:text-indigo-200"
            >
              Visit website
            </a>

            <div className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  d="M14 3h7v7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14L21 3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21H3V3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </article>

        {/* Card 2 */}
        <article className="bg-gray-800 rounded-2xl p-4 flex flex-col gap-4 shadow-md">
          <div className="rounded-lg overflow-hidden h-36 flex items-center justify-center bg-gray-700">
            <img
              src="/assets/card-social.jpg"
              alt="social"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-sm text-gray-300">
            <p className="leading-relaxed">
              Explore the latest features and connect with friends.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm font-medium text-indigo-300 hover:text-indigo-200"
            >
              Visit website
            </a>

            <div className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  d="M14 3h7v7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14L21 3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21H3V3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </article>

        {/* Spacer */}
        <div className="h-6" />
      </div>
    </aside>
  );
};

export default RightSidebar;
