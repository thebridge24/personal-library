import { useState, useEffect } from "react";
import alexanderLogo from "../public/alexander_logo.png";
import { Sun, Moon } from "lucide-react";

/* ======================
   Data
====================== */
const CORRECT_PIN = "1234";
const PROJECT_LINK = "https://your-project-link.com";
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

/* ======================
   Component
====================== */
function App() {
  const [pin, setPin] = useState("");
  const [showPasswordUI, setShowPasswordUI] = useState(false);
  const [isError, setIsError] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  /* ======================
     Effects
  ====================== */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === CORRECT_PIN) {
        setTimeout(() => {
          window.location.href = PROJECT_LINK;
        }, 300);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsError(true);
        setTimeout(() => {
          setPin("");
          setIsError(false);
        }, 1200);
      }
    }
  }, [pin]);

  /* ======================
     Logic
  ====================== */
  const handleKeyPress = (key: string) => {
    if (pin.length === 4) return;
    setPin((prev) => prev + key);
  };

  const clearKey = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-black transition-colors duration-700">
      {/* Neon Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[600px] h-[600px] bg-black dark:bg-white blur-[180px] opacity-[0.09] animate-neon-slow left-1/3 top-1/3 rounded-full" />
      </div>

      {/* Theme Toggle */}
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="absolute top-6 right-6 
  p-3 rounded-full 
  border border-black/30 dark:border-white/30
  text-black dark:text-white
  hover:scale-110 active:scale-95
  transition-all duration-300"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 transition-transform duration-500" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-500" />
        )}
      </button>

      {/* ======================
          Home Screen
      ====================== */}
      <div className="w-full h-screen flex flex-col items-center justify-center gap-6 text-black dark:text-white transition-colors duration-700">
        <img src={alexanderLogo} className="w-72" alt="" />

        <h1 className="text-3xl md:text-6xl xl:text-8xl font-bold text-center">
          Alexander D Bridge
        </h1>
        <p className="-mt-4 opacity-70">Frontend Developer</p>

        <div className="flex gap-4">
          <a
            href="https://wa.me/2349160979848?text=Hi%20Alexander%2C%20I’d%20like%20to%20hire%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black transition active:scale-[0.97]"
          >
            Hire Me
          </a>

          <button
            onClick={() => setShowPasswordUI(true)}
            className="py-3 px-6 rounded-full border-2 border-black dark:border-white transition active:scale-[0.97]"
          >
            View My Projects
          </button>
        </div>
      </div>

      {/* ======================
          Password Modal
      ====================== */}
      {showPasswordUI && (
        <div className="absolute inset-0 bg-white dark:bg-black flex flex-col items-center justify-center gap-10 z-20 transition-colors duration-700">
          <p className="uppercase text-sm tracking-widest opacity-70">
            Enter Passcode
          </p>

          {/* PIN Dots */}
          <div className="flex gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded-full border transition
                ${pin.length > i ? "bg-black dark:bg-white border-black dark:border-white" : "border-gray-400"}
                ${isError ? "animate-shake" : ""}`}
              />
            ))}
          </div>

          {/* Keypad */}
          <div className="flex flex-wrap w-[280px] justify-center gap-4 relative">
            {KEYS.map((key, i) => (
              <button
                key={i}
                onClick={() => handleKeyPress(key)}
                className="w-[5rem] h-[5rem] rounded-full text-2xl bg-black/5 dark:bg-white/10 active:scale-95 transition"
              >
                {key}
              </button>
            ))}

            {pin.length > 0 && (
              <button
                onClick={clearKey}
                className="absolute left-4 bottom-2 text-sm opacity-70"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={() => setShowPasswordUI(false)}
            className="text-sm opacity-50 hover:opacity-100 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
