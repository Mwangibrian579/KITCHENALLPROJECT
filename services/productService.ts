// Use your local Laravel URL
const API_URL = "http://127.0.0.1:8000/api";

export const productService = {
    // Get all products for the shop page
    getAllProducts: async () => {
        try {
            const response = await fetch(`${API_URL}/products`, {
                cache: 'no-store', // Important: Ensures Next.js doesn't show old stock data
            });
            if (!response.ok) throw new Error("Failed to fetch products");
            return await response.json();
        } catch (error) {
            console.error("Product Service Error:", error);
            return [];
        }
    },

    // Get a single product for the Details page
    getSingleProduct: async (id: string | number) => {
        try {
            const response = await fetch(`${API_URL}/products/${id}`);
            if (!response.ok) throw new Error("Product not found");
            return await response.json();
        } catch (error) {
            console.error("Detail Fetch Error:", error);
            return null;
        }
    }
};