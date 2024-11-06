import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    deleteProduct, 
    searchProducts,
    selectFilteredProducts 
} from '../redux/productSlice';

function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(selectFilteredProducts);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        dispatch(searchProducts(term));
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            dispatch(deleteProduct(id));
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Danh Sách Hàng Hóa</h1>
                <button
                    onClick={() => navigate('/add')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Thêm Sản Phẩm
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border rounded"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b">Tên sản phẩm</th>
                            <th className="px-6 py-3 border-b">Giá</th>
                            <th className="px-6 py-3 border-b">Số lượng</th>
                            <th className="px-6 py-3 border-b">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center">
                                    Không tìm thấy sản phẩm nào!
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 border-b">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 border-b text-right">
                                        {product.price.toLocaleString()}đ
                                    </td>
                                    <td className="px-6 py-4 border-b text-right">
                                        {product.quantity}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <button
                                            onClick={() => handleEdit(product.id)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductList;