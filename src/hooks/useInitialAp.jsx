import { useDispatch, useSelector } from "react-redux";
import AuthService from "../service/auth.service";
import { setAccessToken, setIsLogin, setTokens, setUser } from "../redux/slices/auth.slice";
import { useEffect } from "react";

const INTERVAL_REFRESH_TOKEN = import.meta.env.VITE_INTERVAL_REFRESHTOKEN;

const useInitialApp = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const refreshTokenString = useSelector((state) => state.auth.tokens.refreshToken);
    //console.log(refreshTokenString);

    const refreshToken = async () => {
        const [result, error] = await AuthService.refreshToken();
        console.log(result);
        console.log(error);
        if (error) {
            dispatch(setIsLogin(false));
            dispatch(setTokens({ accessToken: "", refreshToken: "" }));
            dispatch(setUser(null))
            return;
        }
        const { accessToken } = result.data;
        dispatch(setAccessToken(accessToken));
        dispatch(setIsLogin(true));
    };

    const fetchUser = async () => {
        const [result, error] = await AuthService.getInfo();
        if (error) {
            dispatch(setUser(null))
            return;
        }
        dispatch(setUser(result.data));
    }

    const fetchData = async () => {
        await refreshToken();
        if (!isLoggedIn) return;
        await Promise.all([fetchUser()])
    };

    useEffect(() => {
        fetchData();
        if (!isLoggedIn) return;
        const intervalId = setInterval(refreshToken, INTERVAL_REFRESH_TOKEN * 1000 * 0.9)
        return () => clearInterval(intervalId);
    }, [dispatch, isLoggedIn, refreshTokenString]);
}

export default useInitialApp;