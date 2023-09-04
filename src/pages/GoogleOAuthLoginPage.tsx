import RowContainer from "../components/atoms/RowContainer";
import { Dispatch, SetStateAction, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GET_USER_PROFILE_IMAGE } from "../secret";

interface GoogleOAuthLoginPageProps {
    setError: Dispatch<SetStateAction<Partial<null | string>>>,
}

function GoogleOAuthLoginpage() {
    const navigate = useNavigate();

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
