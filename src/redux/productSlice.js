import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state ban đầu
const initialState = {
    products: [
        {
            id: 1,
            name: "Sản phẩm mẫu 1",
            price: 100000,
            quantity: 10,
            description: "Mô tả sản phẩm 1"
        },
        {
            id: 2,
            name: "Sản phẩm mẫu 2",
            price: 200000,
            quantity: 20,
            description: "Mô tả sản phẩm 2"
        }
    ],
    filteredProducts: [], 
    selectedProduct: null, 
    loading: false,
    error: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const maxId = Math.max(...state.products.map(p => p.id), 0);
            const newProduct = {
                ...action.payload,
                id: maxId + 1
            };
            state.products.push(newProduct);
            state.filteredProducts = state.products;
        },

        deleteProduct: (state, action) => {
            state.products = state.products.filter(
                product => product.id !== action.payload
            );
            state.filteredProducts = state.products;
        },

        updateProduct: (state, action) => {
            const index = state.products.findIndex(
                product => product.id === action.payload.id
            );
            if (index !== -1) {
                state.products[index] = action.payload;
                state.filteredProducts = state.products;
            }
        },

        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },

        searchProducts: (state, action) => {
            const searchTerm = action.payload.toLowerCase().trim();
            if (searchTerm === '') {
                state.filteredProducts = state.products;
            } else {
                state.filteredProducts = state.products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
            }
        },

        sortProducts: (state, action) => {
            const { field, direction } = action.payload;
            const sortedProducts = [...state.products].sort((a, b) => {
                if (direction === 'asc') {
                    return a[field] > b[field] ? 1 : -1;
                } else {
                    return a[field] < b[field] ? 1 : -1;
                }
            });
            state.products = sortedProducts;
            state.filteredProducts = sortedProducts;
        },

        resetFilters: (state) => {
            state.filteredProducts = state.products;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    addProduct,
    deleteProduct,
    updateProduct,
    setSelectedProduct,
    searchProducts,
    sortProducts,
    resetFilters,
    setLoading,
    setError
} = productSlice.actions;

export default productSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) => state.products.filteredProducts;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;