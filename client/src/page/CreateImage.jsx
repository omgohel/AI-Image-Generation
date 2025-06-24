import React, { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  Wand2,
  Share2,
  Download,
  RefreshCw,
  ImagePlus,
  User,
  Type,
  Zap,
  Heart,
  Upload,
  Eye,
  Wand,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Mock components for demonstration
const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <label className="block text-sm font-semibold text-gray-700">
        <span className="flex items-center gap-2">
          {name === "name" ? (
            <User className="w-4 h-4" />
          ) : (
            <Type className="w-4 h-4" />
          )}
          {labelName}
        </span>
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-3 py-1 rounded-lg transition-all duration-200"
        >
          <Sparkles className="w-4 h-4" />
          Surprise me
        </button>
      )}
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
    />
  </div>
);

const Loader = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-pink-400 rounded-full animate-spin animate-reverse"></div>
    </div>
    <p className="mt-3 text-white font-medium text-sm">Creating magic...</p>
  </div>
);

const CreateImage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const prompts = [
      "A serene mountain landscape at golden hour with misty valleys",
      "Cyberpunk city street with neon lights reflecting on wet pavement",
      "A magical forest with glowing mushrooms and fireflies",
      "Abstract geometric patterns in vibrant sunset colors",
      "A cozy coffee shop on a rainy day with warm lighting",
      "Underwater coral reef with tropical fish swimming around",
      "A futuristic space station orbiting a distant planet",
      "Vintage steam locomotive crossing a stone bridge",
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert("Success! Your creation has been shared with the community.");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Link
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
              to="/"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create & Share
              </h1>
              <p className="text-gray-600 text-sm">
                Transform your imagination into reality
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                {/* <Magic className="w-6 h-6 text-purple-600" /> */}
                <span className="text-sm font-semibold uppercase tracking-wider">
                  AI Creation Studio
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                Bring Your
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Vision to Life
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Generate stunning, imaginative images through advanced AI and
                share your creativity with our vibrant community
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <FormField
                    labelName="Your Name"
                    type="text"
                    name="name"
                    placeholder="Enter your creative name..."
                    value={form.name}
                    handleChange={handleChange}
                  />

                  <FormField
                    labelName="Describe Your Vision"
                    type="text"
                    name="prompt"
                    placeholder="An impressionist oil painting of sunflowers in a purple vase..."
                    value={form.prompt}
                    handleChange={handleChange}
                    isSurpriseMe
                    handleSurpriseMe={handleSurpriseMe}
                  />
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="button"
                onClick={generateImage}
                disabled={!form.prompt || generatingImg}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {generatingImg ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Creating Your Masterpiece...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Image
                  </>
                )}
              </button>

              {/* Share Section */}
              {form.photo && (
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Ready to Share?
                    </h3>
                    <p className="text-gray-600">
                      Your creation is amazing! Share it with the community to
                      inspire others.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Sharing with Community...
                      </>
                    ) : (
                      <>
                        <Share2 className="w-5 h-5" />
                        Share with Community
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </h3>
                {form.photo && (
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200">
                {form.photo ? (
                  <div className="relative group">
                    <img
                      src={form.photo}
                      alt={form.prompt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <p className="text-white text-sm font-medium line-clamp-2">
                        {form.prompt}
                      </p>
                      <p className="text-white/80 text-xs mt-1">
                        by {form.name || "Anonymous"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ImagePlus className="w-16 h-16 mb-4" />
                    <p className="text-lg font-medium">
                      Your creation will appear here
                    </p>
                    <p className="text-sm text-center px-4">
                      Enter a prompt and click generate to see the magic happen
                    </p>
                  </div>
                )}

                {generatingImg && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                    <Loader />
                  </div>
                )}
              </div>

              {/* Prompt Display */}
              {form.prompt && (
                <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Current Prompt:
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {form.prompt}
                  </p>
                </div>
              )}

              {/* Creator Info */}
              {form.name && (
                <div className="mt-4 flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{form.name}</p>
                    <p className="text-sm text-gray-600">Creator</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tips Card */}
            <div className="mt-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-2">Pro Tips</h4>
                  <ul className="space-y-1 text-sm text-white/90">
                    <li>• Be specific about style, colors, and mood</li>
                    <li>
                      • Include artistic references like "oil painting" or
                      "digital art"
                    </li>
                    <li>• Describe lighting conditions for better results</li>
                    <li>• Try the "Surprise me" button for inspiration!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateImage;
