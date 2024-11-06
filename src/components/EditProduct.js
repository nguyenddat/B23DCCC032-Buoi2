import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct, selectAllProducts } from '../redux/productSlice';

function EditProduct() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(selectAllProducts);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const product = products.find(p => p.id === Number(id));
        if (product) {
            setFormData(product);
        } else {
            navigate('/');
        }
    }, [id, products, navigate]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Tên sản phẩm là bắt buộc';
        }
        if (!formData.price || formData.price <= 0) {
            newErrors.price = 'Giá phải lớn hơn 0';
        }
        if (!formData.quantity || formData.quantity <= 0) {
            newErrors.quantity = 'Số lượng phải lớn hơn 0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(updateProduct({
                ...formData,
                id: Number(id),
                price: Number(formData.price),
                quantity: Number(formData.quantity)
            }));
            navigate('/');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container mx-auto max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Chỉnh Sửa Sản Phẩm</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Tên sản phẩm:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded ${
                            errors.name ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Giá:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded ${
                            errors.price ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Số lượng:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded ${
                            errors.quantity ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.quantity && (
                        <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        rows="4"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Cập nhật
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProduct;