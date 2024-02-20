import Login from "./pages/Login";
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import Item from "./pages/Item";
import Items from "./pages/Items";
import AddProduct from "./pages/AddProduct";
import Update from "./pages/Update";
import Scanner from "./components/Scanner";
import { checkCookie } from "./apis/Auth_API";
import NotFound from "./pages/NotFound";


function App() {
  const [logged, isLogged] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await checkCookie();

        console.log(response.loggedIn);

        if (response.loggedIn) {
          navigate('/');
          isLogged(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [logged]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout>
          <Items />
        </Layout>} />
        <Route path="/item/:id" element={<Layout>
          <Item />
        </Layout>} />
        <Route path="/additem" element={<Layout>
          <AddProduct />
        </Layout>} />
        <Route path="/update/:id" element={<Layout>
          <Update />
        </Layout>} />
        <Route path="/scan" element={<Layout>
          <Scanner />
        </Layout>} />
        <Route path="/*" element={<Layout>
          <NotFound />
        </Layout>} />
        <Route path="/login" element={<Login status={{ isLogged }} />} />
      </Routes>
    </div>


  );
}

export default App;
