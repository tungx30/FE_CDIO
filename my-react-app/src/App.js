import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Main } from "./components/Dashboard/main.Dashboard";
import { ListPersonal } from "./components/personal/listPersonal";
import { CreatePersonal } from "./components/personal/createPersonal";
import { UpdatePersonal } from "./components/personal/updatePersonal";
import { DetailPersonal } from "./components/personal/detailPersonal";
import { Route, Routes } from "react-router-dom";
import { Discounts } from "./components/discounts/discount";
import { DetailDiscount } from "./components/discounts/discountDetail";
import { EditDiscount } from "./components/discounts/editDiscount";
import Navbar from "./components/sidebar/Navbar";
import { TableProduct } from "./components/Product/tableProduct";
import AddProduct from "./components/Product/addProduct";
import EditProduct from "./components/Product/editProduct";
import ViewProduct from "./components/Product/viewProduct";

function App() {
  return (
    <>
      <Routes>
      <Route
          path="/sidebar/listPersonal"
          element={
            <Navbar>
              <ListPersonal />
            </Navbar>
          }
        />
        <Route
          path="/sidebar/createPersonal"
          element={
            <Navbar>
              <CreatePersonal />
            </Navbar>
          }
        />
        <Route
          path="/sidebar/updatePersonal/:id"
          element={
            <Navbar>
              <UpdatePersonal />
            </Navbar>
          }
          />
           <Route
          path="/sidebar/detailPersonal/:id"
          element={
            <Navbar>
              <DetailPersonal />
            </Navbar>
          }
        />
        <Route
          path="/sidebar/discount"
          element={
            <Navbar>
              <Discounts  />
            </Navbar>
          }
        /> 
        <Route
          path="/sidebar/tableProduct"
          element={
            <Navbar>
              <TableProduct/>
            </Navbar>
          }
        /> 
        <Route
          path="/sidebar/createProduct"
          element={
            <Navbar>
              <AddProduct/>
            </Navbar>
          }
        /> 
        <Route
          path="/sidebar/updateProduct/:id"
          element={
            <Navbar>
              <EditProduct/>
            </Navbar>
          }
        />
        <Route
          path="/sidebar/detailProduct/:id"
          element={
            <Navbar>
              <ViewProduct/>
            </Navbar>
          }
        />
        <Route
          path="/sidebar/discountDetail/:id"
          element={
            <Navbar>
              <DetailDiscount  />
            </Navbar>
          }
        />
        <Route
          path="/sidebar/editDetail/:id"
          element={
            <Navbar>
              <EditDiscount  />
            </Navbar>
          }
        />
        <Route
          path="/sidebarEdit/:id"
          element={
            <Navbar>
              <EditDiscount />
            </Navbar>
          }
        />
        <Route exact path="/" element={
            <Navbar>
              <Main />
            </Navbar>
          } />
        <Route path="/side" element={<Navbar><ListPersonal/></Navbar>}/>
      </Routes>
    </>
  );
}

export default App;
