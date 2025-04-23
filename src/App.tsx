import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./services/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DrawingWorkshop from "./pages/DrawingWorkshop";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Games from "./pages/Games";
import WordPuzzle from "./pages/games/WordPuzzle";
import NumberGame from "./pages/games/NumberGame";
import MemoryCards from "./pages/games/MemoryCards";
import Puzzle from "./pages/games/Puzzle";
import Favorites from "./pages/library/Favorites";
import Tales from "./pages/library/Tales";
import NewStories from "./pages/library/NewStories";
import CreateStory from "./pages/CreateStory";
import CreateStoryForm from "./pages/CreateStoryForm";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-6xl animate-bounce">🌟</div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900">
          {user && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/library"
              element={user ? <Library /> : <Navigate to="/login" />}
            />
            <Route
              path="/drawing-workshop"
              element={user ? <DrawingWorkshop /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/games"
              element={user ? <Games /> : <Navigate to="/login" />}
            />
            <Route
              path="/games/word-puzzle"
              element={user ? <WordPuzzle /> : <Navigate to="/login" />}
            />
            <Route
              path="/games/number-game"
              element={user ? <NumberGame /> : <Navigate to="/login" />}
            />
            <Route
              path="/games/memory-cards"
              element={user ? <MemoryCards /> : <Navigate to="/login" />}
            />
            <Route
              path="/games/puzzle"
              element={user ? <Puzzle /> : <Navigate to="/login" />}
            />
            <Route
              path="/library/favorites"
              element={user ? <Favorites /> : <Navigate to="/login" />}
            />
            <Route
              path="/library/tales"
              element={user ? <Tales /> : <Navigate to="/login" />}
            />
            <Route
              path="/library/new-stories"
              element={user ? <NewStories /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-story"
              element={user ? <CreateStory /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-story-form"
              element={user ? <CreateStoryForm /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
