import { useContext } from "react";
import { ThemeContext } from "../Context/themeContext.jsx";

function ThemeButton() {
    const ctx=useContext(ThemeContext)
    console.log("ThemeContext value: ", ctx)
    if(!ctx){
        return <div>NO THEME CONTEXT</div>
    }
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="my-2 text-center align-middle text-[15px] h-7 w-20 rounded-full dark:bg-gray-200 bg-gray-600/50
                 hover:scale-105 transition flex justify-center items-center "
    >
      <div className="h-6 w-19 dark:bg-gray-600/50 bg-gray-200 rounded-full">
        {theme === "dark" ? `🌙 ${theme}` : `☀️ ${theme}`}

      </div>
      {/* {theme} */}
    </button>
  );
}

export default ThemeButton;