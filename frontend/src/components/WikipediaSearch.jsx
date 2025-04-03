import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WikipediaSearch = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (input.length === 0) {
      setData("");
      setError("");
    }
  }, [input]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim() === "") return;

    setError("");
    setLoading(true);
    const url = `http://localhost:8080/wiki-brief/${encodeURIComponent(input)}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }

      const text = await response.text();
      setData(text);
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleWikiLink = () => {
    const wikiUrl = `https://wikipedia.org/wiki/${encodeURIComponent(input)}`;
    window.open(wikiUrl, "_blank", "noopener,noreferrer");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.8 } },
  };

  const resultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col items-center justify-center pt-32 sm:pt-16 md:pt-20">
      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 border border-gray-700"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4"
          >
            <motion.h1
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text text-center"
            >
              Crash Course in a Click
            </motion.h1>

            <p className="text-gray-300 text-center text-sm sm:text-base mb-2">
              Enter any topic to get a concise Wikipedia summary
            </p>

            <div className="flex flex-col sm:flex-row items-center w-full space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type any topic..."
                className="bg-gray-900 text-white w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner border border-gray-700"
                aria-label="Search topic"
              />
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 shadow-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? "Searching..." : "Search"}
              </motion.button>
            </div>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-200 text-sm sm:text-base"
              role="alert"
            >
              <p>{error}</p>
            </motion.div>
          )}

          {data && (
            <motion.div
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              className="mt-4"
            >
              <div className="bg-gray-800 p-4 rounded-lg shadow-inner border border-gray-700 whitespace-pre-wrap text-gray-200 leading-relaxed text-sm sm:text-base result-container h-[20vh] overflow-y-auto">
                {data}
              </div>

              <div className="flex justify-center mt-4">
                <motion.button
                  type="button"
                  onClick={handleWikiLink}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View on Wikipedia
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WikipediaSearch;
