import { useState } from "react";
import alexanderLogo from "./assets/alexander_logo.png";

/* ======================
   Data
====================== */
const CORRECT_PIN = "1234";
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

/* ======================
   Component
====================== */
function App() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [isError, setIsError] = useState(false);

  /* ======================
     Logic
  ====================== */
  const handleKeyPress = (key: string) => {
    if (!key || pin.length === 4) return;

    const nextPin = pin + key;
    setPin(nextPin);

    if (nextPin.length === 4) {
      if (nextPin === CORRECT_PIN) {
        setTimeout(() => setUnlocked(true), 200);
      } else {
        setIsError(true);
        setTimeout(() => {
          setPin("");
          setIsError(false);
        }, 1200);
      }
    }
  };

  const clearKey = () => {
      setPin(pin.slice(0, -1));
      return;
    }
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* ======================
          Lock Screen
      ====================== */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-10 bg-white
        transition-transform duration-1000 ease-in-out
        ${unlocked ? "-translate-y-full" : "translate-y-0"}`}
      >
        <p
        style={{
          animationDelay: '0.0001s'
        }}
          className={`${unlocked ? "animate-slide-up" : ""} text-sm tracking-widest text-gray-500 uppercase`}
        >
          Enter Passcode
        </p>

        {/* PIN Dots */}
        <div className="flex gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                animationDelay: isError
                  ? `${i * 0.05}s`
                  : unlocked
                    ? `${i * 0.001}s`
                    : "0s",
              }}
              className={`w-5 h-5 rounded-full ${isError ? "animate-shake" : unlocked ? "animate-slide-up" : ""}
              ${pin.length > i ? "bg-black border-black" : "border-gray-400"}`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="flex flex-wrap w-[280px] justify-center gap-4 relative">
          {KEYS.map((key, i) => (
            <button
              key={i}
              onClick={() => handleKeyPress(key)}
              style={{
                animationDelay: isError
                  ? `${i * 0.05}s`
                  : unlocked
                    ? `${i * 0.01}s`
                    : "0s",
              }}
              aria-label="keypad"
              className={`w-[5rem] h-[5rem] rounded-full ${isError ? "animate-shake" : unlocked ? "animate-slide-up" : ""} 
               text-2xl font-medium bg-black/5 active:rounded-xl active:scale-95 transition duration-200 hover:bg-black/80 hover:text-white`}
            >
              {key}
            </button>
          ))}

         {pin.length > 0 && <button onClick={clearKey} aria-label="clear button" className="animate-fade absolute left-4 bottom-2 p-4 rounded-full duration-100 ">
            <svg className="size-8" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 7 2 c -0.832031 0 -1.558594 0.34375 -2.292969 0.78125 s -1.464843 1.003906 -2.128906 1.597656 c -0.660156 0.597656 -1.253906 1.222656 -1.707031 1.796875 c -0.226563 0.289063 -0.417969 0.5625 -0.570313 0.835938 c -0.152343 0.277343 -0.300781 0.53125 -0.300781 0.988281 s 0.148438 0.710938 0.300781 0.984375 c 0.152344 0.277344 0.34375 0.550781 0.570313 0.835937 c 0.453125 0.578126 1.046875 1.203126 1.707031 1.796876 c 0.664063 0.597656 1.394531 1.164062 2.128906 1.601562 s 1.460938 0.78125 2.292969 0.78125 h 6 c 1.644531 0 3 -1.355469 3 -3 v -6 c 0 -1.644531 -1.355469 -3 -3 -3 z m 1 3 c 0.265625 0 0.519531 0.105469 0.707031 0.292969 l 1.292969 1.292969 l 1.292969 -1.292969 c 0.1875 -0.1875 0.441406 -0.292969 0.707031 -0.292969 s 0.519531 0.105469 0.707031 0.292969 c 0.390625 0.390625 0.390625 1.023437 0 1.414062 l -1.292969 1.292969 l 1.292969 1.292969 c 0.390625 0.390625 0.390625 1.023437 0 1.414062 s -1.023437 0.390625 -1.414062 0 l -1.292969 -1.292969 l -1.292969 1.292969 c -0.390625 0.390625 -1.023437 0.390625 -1.414062 0 s -0.390625 -1.023437 0 -1.414062 l 1.292969 -1.292969 l -1.292969 -1.292969 c -0.390625 -0.390625 -0.390625 -1.023437 0 -1.414062 c 0.1875 -0.1875 0.441406 -0.292969 0.707031 -0.292969 z m 0 0" fill="#000000"></path> </g></svg>
          </button>}

        </div>
         <a
              style={{
                animationDelay: isError
                  ? `0.05s` : "0s",
              }}
               href="https://wa.me/2349160979848?text=I'm%20trying%20to%20access%20your%20website%20but%20I%20don't%20know%20the%20passcode"
  target="_blank"
  rel="noopener noreferrer"
              aria-label="keypad"
              className={`p-3 px-6 rounded-full ${ unlocked ? "animate-slide-up" : "hover:bg-black/5 hover:text-black active:scale-95"} active:rounded-xl text-xl font-medium
              text-white bg-black active:scale-95 transition duration-200`}
            >
              Emergency
            </a>
      </div>

      {/* ======================
          Home Screen
      ====================== */}
      {unlocked && (
        <div className="animate-fade w-full h-screen flex flex-col items-center justify-center gap-6">
          <img src={alexanderLogo} className="w-72" alt="" />

          <h1 className="text-3xl md:text-6xl xl:text-8xl font-bold text-center">
            Alexander D Bridge
          </h1>

          <div className="flex gap-4">
          
         <a
              aria-label="keypad"
              href="https://wa.me/2349160979848?text=Hi%20Alexander%2C%20I%20visited%20your%20website%20and%20I’d%20like%20to%20hire%20you."
  target="_blank"
  rel="noopener noreferrer"
              className={`py-3 px-6 rounded-full active:rounded-xl active:scale-[0.97]
              text-white bg-black transition duration-200`}
            >
               Hire Me
            </a>
            <a
             href="https://wa.me/2349160979848?text=Hi%20Alexander%2C%20I%20saw%20your%20website%20and%20I’d%20like%20to%20see%20more%20of%20your%20projects."
  target="_blank"
  rel="noopener noreferrer"
              aria-label="keypad"
              className={`py-3 px-6 rounded-full active:rounded-xl
             active:scale-[0.97] transition duration-200 border-2 border-black
            hover:bg-black/`}
            >
               View My Projects
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
