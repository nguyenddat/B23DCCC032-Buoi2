import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Quản lý hàng hóa</h1>
      
      <nav>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `block py-2 px-4 mb-2 rounded ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`
          }
          end
        >
          Danh sách sản phẩm
        </NavLink>

        <NavLink 
          to="/add" 
          className={({ isActive }) => 
            `block py-2 px-4 mb-2 rounded ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`
          }
        >
          Thêm sản phẩm
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;