import { useEffect } from "react";

export default function useCalculateWindow(inputRef) {
  useEffect(() => {
    //console.log('calculate window');
    window.addEventListener("scroll", function () {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      if (documentHeight - scrollTop <= windowHeight) {
        inputRef.current?.click();
      }
    });
  }, []);
}
