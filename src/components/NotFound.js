import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">404 - Không tìm thấy trang</h1>
      <p className="mb-4">Trang bạn đang tìm kiếm không tồn tại.</p>
      <Link 
        to="/" 
        className="text-blue-500 hover:text-blue-700"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}

export default NotFound;