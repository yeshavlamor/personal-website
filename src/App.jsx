import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { AllWritings } from './pages/AllWritings';
import { Writing } from './pages/Writing';
import { Category } from './pages/Category';
import { Experience } from './pages/Experience';
import { Toaster } from './ui/toaster';
import { ScrollToTop } from './components/ScrollToTop';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/writings" element={<AllWritings />} />
          <Route path="/writings/:slug" element={<Writing />} />
          <Route path="/writings/category/:category" element={<Category />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="*" element={<NotFound />} /> 
          /* NotFound path will be the last defined path in the Routes component
          so that all undefined paths will be redirected to the NotFound page */
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Analytics />
    </>
  );
}

export default App;
