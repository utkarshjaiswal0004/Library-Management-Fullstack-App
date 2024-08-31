import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./pages/component/footer";
import Navbar from "./pages/component/navbar";
import LandingPage from "./pages/landing-page";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
