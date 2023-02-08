import { useEffect } from "react";

export const useMultipleKeyPress = (callback, targetKeys) => {

   let currentPressed = [];

   const checkPressedKeys = () => {
      let counter = targetKeys.length;
      targetKeys.forEach(targetKey => {
         if (currentPressed.find(pressedKey => targetKey === pressedKey)) {
            counter -= 1
         }
      });
      return counter;
   }

   const keyDownHandler = (e) => {
      if (!currentPressed.find((element) => element === e.key)) {
         currentPressed.push(e.key);
      }
      if (currentPressed.length === targetKeys.length) {
         if (checkPressedKeys() === 0) {
            callback();
         }
      }
   }
   const keyUpHandler = (e) => {
      currentPressed = currentPressed.filter((element => element !== e.key))
   }

   useEffect(() => {
      window.addEventListener('keydown', keyDownHandler);
      window.addEventListener('keyup', keyUpHandler);

      return () => {
         window.removeEventListener('keydown', keyDownHandler);
         window.removeEventListener('keyup', keyUpHandler);
      }
   }, [callback, targetKeys])
}