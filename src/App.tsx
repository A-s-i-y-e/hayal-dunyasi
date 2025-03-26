import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./services/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import DrawingWorkshop from "./pages/DrawingWorkshop";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900">
        {user && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/stories"
            element={user ? <Stories /> : <Navigate to="/login" />}
          />
          <Route
            path="/drawing-workshop"
            element={user ? <DrawingWorkshop /> : <Navigate to="/login" />}
          />
          <Route
            path="/library"
            element={user ? <Library /> : <Navigate to="/login" />}
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
