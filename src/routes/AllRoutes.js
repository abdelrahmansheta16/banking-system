import { Routes, Route } from "react-router-dom";
import { PageNotFound, CustomerList, Home, Transfer, Results } from "../pages";

export const AllRoutes = () => {
  return (
    <div className="dark:bg-darkbg">
      <Routes>
        <Route path="" element={<Home title="Home" />} />
        <Route path="customers" element={<CustomerList title="Costumers" />} />
        <Route path="transfer" element={<Transfer title="Transfer" />} />
        <Route path="results" element={<Results title="Results" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
