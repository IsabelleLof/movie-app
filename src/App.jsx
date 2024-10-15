import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import FavoritesList from "./components/FavoritesList";
import NavigationMenu from "./components/NavigationMenu";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-red-100">
        <NavigationMenu />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <MovieList />
              </>
            }
          />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
