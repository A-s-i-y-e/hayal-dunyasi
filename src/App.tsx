import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { auth } from "./services/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthProvider } from "./contexts/AuthContext";
import { TimeLimitProvider } from "./contexts/TimeLimitContext";
import TimeLimitCheck from "./components/TimeLimitCheck";
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
import Favorites from "./pages/library/Favorites";
import Tales from "./pages/library/Tales";
import Stories from "./pages/Stories";
import CreateStory from "./pages/CreateStory";
import CreateStoryForm from "./pages/CreateStoryForm";
import StoryDetail from "./pages/StoryDetail";
import MyStories from "./pages/library/MyStories";
import StoryDetailNew from "./pages/StoryDetailNew";
import MigrationTest from "./pages/MigrationTest";

const AppContent: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-6xl animate-bounce">🌟</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900">
      {!isAuthPage && <Navbar />}
      <main className={!isAuthPage ? "pt-20 pb-8 px-4" : "min-h-screen"}>
        <TimeLimitCheck>
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
              path="/library/favorites"
              element={user ? <Favorites /> : <Navigate to="/login" />}
            />
            <Route
              path="/library/tales"
              element={user ? <Tales /> : <Navigate to="/login" />}
            />
            <Route
              path="/library/my-stories"
              element={user ? <MyStories /> : <Navigate to="/login" />}
            />
            <Route
              path="/stories"
              element={user ? <Stories /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-story"
              element={user ? <CreateStory /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-story-form"
              element={user ? <CreateStoryForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/story/:id"
              element={user ? <StoryDetail /> : <Navigate to="/login" />}
            />
            <Route
              path="/stories/:id"
              element={user ? <StoryDetailNew /> : <Navigate to="/login" />}
            />
            <Route
              path="/migration-test"
              element={user ? <MigrationTest /> : <Navigate to="/login" />}
            />
          </Routes>
        </TimeLimitCheck>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TimeLimitProvider>
        <Router>
          <AppContent />
        </Router>
      </TimeLimitProvider>
    </AuthProvider>
  );
};

export default App;
