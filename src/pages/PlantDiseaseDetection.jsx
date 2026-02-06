import { useState, useRef } from "react";

const PlantDiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const API_KEY = "QwGEXhmnSwrjZgYsvorSpVzPqCEO2IdUrab6uCTEa3Lz3oq49j";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear previous results when uploading new image
    setResult(null);
    setError("");

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzePlant = async () => {
    if (!image) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "https://api.plant.id/v3/health_assessment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Key": API_KEY,
          },
          body: JSON.stringify({
            images: [image],
            latitude: 49.207,
            longitude: 16.608,
            similar_images: true,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Invalid request");
        return;
      }

      setResult(data.result);
    } catch {
      setError("Failed to analyze plant. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-emerald-800 bg-clip-text text-transparent">
              Plant Health Intelligence
            </h1>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Advanced AI-powered plant disease detection for healthier gardens
            and farms
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-emerald-100/50 border border-slate-200/80 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* LEFT: Image Upload */}
            <div className="p-10 lg:border-r border-slate-200/60 relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                    Upload Image
                  </h2>
                  <p className="text-slate-500">
                    {preview
                      ? "Image ready for analysis"
                      : "Capture or upload a clear photo of your plant"}
                  </p>
                </div>
                {preview && (
                  <button
                    onClick={resetAnalysis}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Clear
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                />

                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-dashed border-slate-300/80 p-10 transition-all duration-300 hover:border-emerald-400 hover:shadow-lg">
                  {preview ? (
                    <div
                      className="relative h-96 rounded-xl overflow-hidden group cursor-pointer"
                      onClick={handleImageClick}
                    >
                      <img
                        src={preview}
                        alt="Plant analysis"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20 transition-all duration-300" />

                      {/* Image Overlay Instructions */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg">
                          <svg
                            className="w-8 h-8 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg text-center max-w-xs">
                          <p className="text-slate-800 font-medium mb-1">
                            Click to upload different image
                          </p>
                          <p className="text-slate-500 text-sm">
                            Or drag & drop a new file here
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center h-96 cursor-pointer group"
                    >
                      <div className="relative mb-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="w-12 h-12 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="text-slate-800 font-semibold text-lg mb-2">
                        Select Plant Image
                      </p>
                      <p className="text-slate-500 text-center max-w-xs mb-6">
                        Click to browse or drag & drop
                      </p>
                      <div className="px-6 py-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium group-hover:bg-emerald-100 transition-colors">
                        Browse files
                      </div>
                    </label>
                  )}
                </div>

                {/* Drag & Drop Hint */}
                <div className="mt-4 text-center">
                  <p className="text-slate-400 text-sm">
                    {preview
                      ? "Click on the image to upload a different one"
                      : "Supports JPG, PNG, WebP up to 5MB"}
                  </p>
                </div>

                {/* Action Buttons for Mobile */}
                <div className="mt-8 lg:hidden flex flex-col gap-3">
                  <button
                    onClick={analyzePlant}
                    disabled={loading || !image}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Analyzing...
                      </span>
                    ) : (
                      "Analyze Plant Health"
                    )}
                  </button>

                  {result && (
                    <button
                      onClick={resetAnalysis}
                      className="w-full py-3 bg-white text-emerald-600 font-medium rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Start New Analysis
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Analysis Panel */}
            <div className="p-10 bg-gradient-to-b from-white to-slate-50/50">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                  Health Analysis
                </h2>
                <p className="text-slate-500">
                  {result
                    ? "AI assessment results"
                    : "Real-time AI assessment of plant condition"}
                </p>
              </div>

              {result ? (
                <div className="space-y-6">
                  {/* Health Status Card */}
                  <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          Health Status
                        </h3>
                        <p className="text-slate-500 text-sm">
                          Overall plant condition
                        </p>
                      </div>
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                          result.is_healthy.binary
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {result.is_healthy.binary
                          ? "Healthy"
                          : "Needs Attention"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">Confidence</span>
                        <span className="font-semibold text-slate-900">
                          {(result.is_healthy.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            result.is_healthy.binary
                              ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                              : "bg-gradient-to-r from-amber-400 to-amber-500"
                          }`}
                          style={{
                            width: `${result.is_healthy.probability * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Disease Detection */}
                  {!result.is_healthy.binary &&
                    result.disease?.suggestions?.length > 0 && (
                      <div className="bg-gradient-to-br from-white to-rose-50/20 rounded-xl border border-rose-200/50 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-rose-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">
                              Potential Issue
                            </h3>
                            <p className="text-rose-700 font-medium mt-1">
                              {result.disease.suggestions[0].name}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">
                              Detection Confidence
                            </span>
                            <span className="font-semibold text-rose-600">
                              {(
                                result.disease.suggestions[0].probability * 100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                          <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all duration-1000"
                              style={{
                                width: `${result.disease.suggestions[0].probability * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Plant Verification */}
                  <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">
                          Plant Verification
                        </h3>
                        <p className="text-slate-500 text-sm">
                          AI confidence in plant identification
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">Accuracy Score</span>
                        <span className="font-semibold text-blue-600">
                          {(result.is_plant.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000"
                          style={{
                            width: `${result.is_plant.probability * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gradient-to-br from-emerald-50/50 to-white rounded-xl border border-emerald-200/50 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">
                          Next Steps
                        </h3>
                        <p className="text-slate-500 text-sm">
                          {result.is_healthy.binary
                            ? "Your plant appears healthy. Maintain current care routine."
                            : "Consider consulting a specialist for treatment options."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 px-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-12 h-12 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {preview ? "Ready for Analysis" : "Awaiting Analysis"}
                  </h3>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    {preview
                      ? "Click 'Analyze Plant Health' to receive detailed insights"
                      : "Upload a plant image to receive AI-powered health diagnosis"}
                  </p>
                </div>
              )}

              {/* Action Buttons for Desktop */}
              <div className="mt-10 hidden lg:block">
                <button
                  onClick={analyzePlant}
                  disabled={loading || !image}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing Analysis...
                    </span>
                  ) : result ? (
                    "Re-analyze Image"
                  ) : (
                    "Analyze Plant Health"
                  )}
                </button>

                {/* Start New Analysis Button */}
                {result && (
                  <button
                    onClick={resetAnalysis}
                    className="w-full py-3 mt-4 bg-white text-emerald-600 font-medium rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Start New Analysis
                    </span>
                  </button>
                )}

                {error && (
                  <div className="mt-4 rounded-lg bg-rose-50 border border-rose-200 p-4">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-rose-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-rose-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p className="mb-2">
            Powered by advanced machine learning models trained on millions of
            plant images
          </p>
          <p>Results accuracy: 95% • Average processing time: 3-5 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default PlantDiseaseDetection;
