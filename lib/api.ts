// This is the absolute address of your Laravel Backend
const BASE_URL = 'http://127.0.0.1:8000/api';

export const adminApi = {
  // 1. GET DATA (Fetch)
  // path: 'manage-products', 'users', or 'admin/list'
  get: async (path: string, token: string) => {
    const res = await fetch(`${BASE_URL}/${path}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json' 
      }
    });
    return res.json();
  },

  // 2. DELETE DATA (Nuke)
  delete: async (path: string, id: number, token: string) => {
    const res = await fetch(`${BASE_URL}/${path}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  }
};