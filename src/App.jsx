import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Writing } from './pages/Writing';
import { Category } from './pages/Category';
import { Toaster } from './ui/toaster';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/writings/:slug" element={<Writing />} />
          <Route path="/writings/category/:category" element={<Category />} />
          <Route path="*" element={<NotFound />} /> 
          /* NotFound path will be the last defined path in the Routes component
          so that all undefined paths will be redirected to the NotFound page */
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
