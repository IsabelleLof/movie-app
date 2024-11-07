import { createSlice } from "@reduxjs/toolkit";


const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [], 
  },
  reducers: {
    // Reducer för att lägga till en favorit
    addFavorite: (state, action) => {
      // Kontrollera om state.items är en array, om inte, initiera den som en tom array
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      // Lägg till det nya favoritobjektet i arrayen
      state.items.push(action.payload);

      // Skicka händelsen till dataLayer för Google Tag Manager (GTM)
      if (window && window.dataLayer) {
        window.dataLayer.push({
          event: "add_to_favorite", // Anpassat GTM-event för att markera att en favorit lades till
          favoriteItem: {
            id: action.payload.id, // Filmens id
            title: action.payload.title, // Filmens titel 
          },
        });
      }
    },
    // Reducer för att ta bort en favorit
    removeFavorite: (state, action) => {
      // Kontrollera om state.items är en array, om inte, initiera den som en tom array
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      // Filtrera bort objektet med matchande id från listan över favoriter
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      // Skicka händelsen till dataLayer för Google Tag Manager (GTM)
      if (window && window.dataLayer) {
        window.dataLayer.push({
          event: "remove_from_favorite", // Anpassat GTM-event för att markera att en favorit togs bort
          favoriteItem: {
            id: action.payload.id, // Filmens id
            title: action.payload.title, // Filmens titel 
          },
        });
      }
    },
  },
});

// Exportera actions för att kunna anropa dem i komponenter
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Exportera reducer för att inkludera den i store-konfigurationen
export default favoritesSlice.reducer;

// Selector för att hämta favoritlistan från state
export const selectFavorites = (state) => state.favorites.items;
