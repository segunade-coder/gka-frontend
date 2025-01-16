import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./routes/admin/Login";
import { lazy, Suspense } from "react";
import PageLoader from "./components/PageLoader";
import Notfound from "./components/Notfound";
import EditSlider from "./routes/admin/EditSlider.tsx";
import EditAbout from "./routes/admin/EditAbout.tsx";
import EditGallery from "./routes/admin/EditGallery.tsx";
import EditHistory from "./routes/admin/EditHistory.tsx";
import EditNews from "./routes/admin/EditNews.tsx";
import IndNews from "./routes/news/IndNews.tsx";
import AllNews from "./components/AllNews.tsx";
import PrivacyPolicy from "./components/Privacy.tsx";
import AllGallery from "./components/AllGallery.tsx";
const Home = lazy(() => import("./routes/Home"));
const Main = lazy(() => import("./routes/admin/Main.tsx"));
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path=""
          element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="gallery/all" element={<AllGallery />} />
        <Route path="news" element={<AllNews />} />
        <Route path="news/:id" element={<IndNews />} />
        <Route path="login" element={<Login />} />
        <Route
          path="admin"
          element={
            <Suspense fallback={<PageLoader />}>
              <Main />
            </Suspense>
          }
        >
          <Route path="slider" element={<EditSlider />} />
          <Route path="about" element={<EditAbout />} />
          <Route path="gallery" element={<EditGallery />} />
          <Route path="history" element={<EditHistory />} />
          <Route path="news" element={<EditNews />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
