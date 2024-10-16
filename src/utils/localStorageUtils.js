// localStorageUtils.js

// Funktion för att spara till localStorage
export const saveStateToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('movieAppState', serializedState); // Spara hela appens tillstånd som en JSON-sträng
    } catch (error) {
      console.error("Could not save state to localStorage", error);
    }
  };
  
  // Funktion för att ladda från localStorage
  export const loadStateFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('movieAppState');
      if (serializedState === null) {
        return undefined; // Returnera undefined om inget tillstånd finns
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.error("Could not load state from localStorage", error);
      return undefined;
    }
  };
  