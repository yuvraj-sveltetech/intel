import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Vulnerabilities } from "./pages/Vulnerabilities";
import { Breaches } from "./pages/Breaches";
import { Intelligence } from "./pages/Intelligence";
import { ArticleDetail } from "./pages/ArticleDetail";
import { Login } from "./pages/Login";
import { MatrixRain } from "./components/ui/MatrixRain";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/secure-access-authentication-portal-cybersecurity-intelligence-platform" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <div className="min-h-screen relative overflow-x-hidden">
                <MatrixRain />
                <Navigation />
                <main className="relative z-10">
                  <Home />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/news" element={
            <ProtectedRoute>
              <div className="min-h-screen relative overflow-x-hidden">
                <MatrixRain />
                <Navigation />
                <main className="relative z-10">
                  <News />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/vulnerabilities" element={
            <ProtectedRoute>
              <div className="min-h-screen relative overflow-x-hidden">
                <MatrixRain />
                <Navigation />
                <main className="relative z-10">
                  <Vulnerabilities />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/breaches" element={
            <ProtectedRoute>
              <div className="min-h-screen relative overflow-x-hidden">
                <MatrixRain />
                <Navigation />
                <main className="relative z-10">
                  <Breaches />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/intelligence" element={
            <ProtectedRoute>
              <div className="min-h-screen relative overflow-x-hidden">
                <MatrixRain />
                <Navigation />
                <main className="relative z-10">
                  <Intelligence />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/article/:id" element={
            <ProtectedRoute>
              <div className="min-h-screen relative overflow-x-hidden">
                <MatrixRain />
                <Navigation />
                <main className="relative z-10">
                  <ArticleDetail />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
