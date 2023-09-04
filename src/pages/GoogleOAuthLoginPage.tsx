import RowContainer from "../components/atoms/RowContainer";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function GoogleOAuthLoginpage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const token = new URL(window.location.href).searchParams.get("token");
        token && localStorage.setItem('token', token);
        return navigate('/scrap/list');
    }, [navigate])
    return (
        <RowContainer style={{
            width: '100vw',
            height: 'calc(100vh - 50px)',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <CircularProgress />
        </RowContainer>
    )
}

export default GoogleOAuthLoginpage
