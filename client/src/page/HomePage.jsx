import React, { useEffect, useState } from "react";
import { Search, Sparkles, Image, Filter, Grid, List } from "lucide-react";

// Mock components for demonstration
const Card = ({ _id, name, prompt, photo }) => (
  <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200">
    <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
      {photo ? (
        <img
          src={photo}
          alt={prompt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Image className="w-16 h-16 text-gray-300" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
        <p className="text-white text-sm font-medium truncate">{name}</p>
        <p className="text-white/80 text-xs mt-1 line-clamp-2">{prompt}</p>
      </div>
    </div>
  </div>
);

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
}) => (
  <div className="relative">
    <label className="block text-sm font-semibold text-gray-700 mb-3">
      {labelName}
    </label>
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
      />
    </div>
  </div>
);

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-400 rounded-full animate-spin animate-reverse"></div>
    </div>
    <p className="mt-4 text-gray-600 font-medium">
      Loading amazing creations...
    </p>
  </div>
);

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
      <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
        <Sparkles className="w-10 h-10 text-purple-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md">
        {title.includes("Search")
          ? "Try adjusting your search terms or explore other creative works"
          : "Be the first to share your AI-generated masterpiece with the community!"}
      </p>
    </div>
  );
};

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const resultsToShow = searchText ? searchedResults : allPosts;
  const resultCount = resultsToShow?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              AI Gallery
            </span>
          </div>
          <h1 className="font-black text-gray-900 text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            The Community
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Showcase
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover an extraordinary collection of imaginative and visually
            stunning images generated by cutting-edge AI technology
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <FormField
            labelName="🔍 Search posts"
            type="text"
            name="text"
            placeholder="Search by creator name or prompt description..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>

        {/* Results Header */}
        {!loading && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              {searchText && (
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Search Results
                  </h2>
                  <p className="text-gray-600">
                    Found{" "}
                    <span className="font-semibold text-purple-600">
                      {resultCount}
                    </span>{" "}
                    result{resultCount !== 1 ? "s" : ""} for "
                    <span className="font-semibold text-gray-800">
                      {searchText}
                    </span>
                    "
                  </p>
                </div>
              )}
              {!searchText && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Latest Creations
                  </h2>
                  <p className="text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-purple-600">
                      {resultCount}
                    </span>{" "}
                    amazing creation{resultCount !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-purple-100 text-purple-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-purple-100 text-purple-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative">
          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <Loader />
            </div>
          ) : (
            <div
              className={`grid gap-6 transition-all duration-300 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              <RenderCards
                data={resultsToShow}
                title={searchText ? "No Search Results Found" : "No Posts Yet"}
              />
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {!loading && resultsToShow?.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-6 bg-white rounded-2xl px-8 py-4 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {resultCount}
                </div>
                <div className="text-sm text-gray-600">Creations</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">∞</div>
                <div className="text-sm text-gray-600">Imagination</div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
