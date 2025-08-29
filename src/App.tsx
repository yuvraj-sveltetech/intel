import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Vulnerabilities } from "./pages/Vulnerabilities";
import { Breaches } from "./pages/Breaches";
import { Intelligence } from "./pages/Intelligence";
import { ArticleDetail } from "./pages/ArticleDetail";
import { MatrixRain } from "./components/ui/MatrixRain";

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-x-hidden">
        <MatrixRain />
        <Navigation />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/vulnerabilities" element={<Vulnerabilities />} />
            <Route path="/breaches" element={<Breaches />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
