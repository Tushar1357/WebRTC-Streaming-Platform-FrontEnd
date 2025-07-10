import Toast from "./components/Toast";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { checkToken } from "./services/auth/checkUserAuth";
import { authActions } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await checkToken();
        console.log(response)
        if (response.status) {
          dispatch(authActions.login({ user: response.message }));
        } else {
          dispatch(authActions.setLoading(false)); 
        }
      } catch (error) {
        dispatch(authActions.setLoading(false));
      }
    };
    checkUser();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Toast />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
