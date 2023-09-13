import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();
    localStorage.removeItem('token');
    localStorage.removeItem('profileImageURL');
    navigate('/main');
}

export function useGetToken() {
    return localStorage.getItem('token');
}