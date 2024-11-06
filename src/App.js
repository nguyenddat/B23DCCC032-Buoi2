import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        
        <div className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
