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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/secure-access-authentication-portal-cybersecurity-intelligence-platform" element={<Login />} />
          <Route path="/" element={
            <div className="min-h-screen relative overflow-x-hidden">
              <MatrixRain />
              <Navigation />
              <main className="relative z-10">
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/news" element={
            <div className="min-h-screen relative overflow-x-hidden">
              <MatrixRain />
              <Navigation />
              <main className="relative z-10">
                <News />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/vulnerabilities" element={
            <div className="min-h-screen relative overflow-x-hidden">
              <MatrixRain />
              <Navigation />
              <main className="relative z-10">
                <Vulnerabilities />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/breaches" element={
            <div className="min-h-screen relative overflow-x-hidden">
              <MatrixRain />
              <Navigation />
              <main className="relative z-10">
                <Breaches />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/intelligence" element={
            <div className="min-h-screen relative overflow-x-hidden">
              <MatrixRain />
              <Navigation />
              <main className="relative z-10">
                <Intelligence />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/article/:id" element={
            <div className="min-h-screen relative overflow-x-hidden">
              <MatrixRain />
              <Navigation />
              <main className="relative z-10">
                <ArticleDetail />
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
