import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import ReactMarkdown from "react-markdown";
import sarahImage from "../assets/sarah.svg";
import gemini from "../assets/gemini.svg";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const { profile, isAuthenticated } = useAuth();
  const chatContainerRef = useRef(null);
  console.log(profile);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending

    // Add user question to chat history
    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAdfcdasvkda5UU3Y152qvc5edYzhIO7XU`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const aiResponse =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: aiResponse },
      ]);
      setAnswer(aiResponse);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="fixed inset-0">
      {/* Blurred Background */}
      <div className="fixed inset-0 bg-gradient-to-r from-white to-orange-200 blur-md"></div>

      {/* Centered Card Overlay */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center z-50">
          <div className="mb-6">
            <img
              src={sarahImage}
              alt="Aasha"
              className="w-20 h-20 mx-auto mb-4 animate-pulse"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Coming Soon!
          </h2>
          <p className="text-gray-600 mb-2">
            We're working hard on this feature.
          </p>
          <p className="text-sm text-orange-600 font-semibold">
            Powered by Aasha
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-orange-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 bg-orange-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="h-full max-w-4xl mx-auto flex flex-col p-3 pointer-events-none">
        {/* Fixed Header */}
        <header className="text-center py-4 mt-16"></header>

        {/* Scrollable Chat Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white shadow-lg p-4 hide-scrollbar"
        >
          {chatHistory.length === 0 ? (
            // New Welcome Screen
            <div className="welcom-screen flex flex-col items-center justify-center text-center p-6">
              <img
                src={sarahImage}
                alt="sarah Hash include chatbot"
                className="bot-img mb-4"
              />
              <div className="hide-on">
                <p className="text-xl font-semibold">
                  Hi, I’m <span className="sarah font-bold">Aasha.</span>
                </p>
                <p className="text-gray-700">Your bot Assistant</p>
                <p className="powered-by text-gray-500">
                  Powered By{" "}
                  <span className="gemini font-bold">
                    Gemini{" "}
                    <img
                      src={gemini}
                      alt="gemini image"
                      className="inline h-4"
                    />
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-4 ${chat.type === "question" ? "text-right" : "text-left"}`}
                >
                  <div className="flex items-start gap-2">
                    {chat.type === "question" && profile?.photo?.url && (
                      <img
                        src={profile.photo.url}
                        alt="User icon"
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    {/* Show AI photo for answers */}
                    {chat.type === "answer" && (
                      <img src={sarahImage} alt="AI icon" className="w-6 h-6" />
                    )}
                    <div
                      className={`inline-block max-w-[80%] p-3 rounded-lg overflow-auto hide-scrollbar ${
                        chat.type === "question"
                          ? "bg-orange-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <ReactMarkdown className="overflow-auto hide-scrollbar">
                        {chat.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {generatingAnswer && (
            <div className="text-left flex items-center gap-2">
              <img src={sarahImage} alt="AI icon" className="w-6 h-6" />
              <div className="inline-block bg-gray-100 p-3 rounded-lg animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Fixed Input Form */}
        <form
          onSubmit={generateAnswer}
          className="bg-white rounded-lg shadow-lg p-4"
        >
          <div className="flex gap-2">
            <textarea
              required
              className="flex-1 border border-gray-300 rounded p-3 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
              rows="2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></textarea>
            <button
              type="submit"
              className={`px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors ${
                generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={generatingAnswer}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCpojCiK2jiTGgmTQ-2GE7REduvrMtDFCw`;
