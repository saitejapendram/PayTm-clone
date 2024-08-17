import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { Dashboard } from "./pages/dashboard";
import { SendMoney } from "./components/sendMoney";
import { RecoilRoot } from "recoil";

import { Transactions } from "./pages/transactions";

import { Status } from "./components/status";

function App() {

  return (
    <>
       <RecoilRoot>
       <BrowserRouter>
          <Routes>
            <Route  path="/signup"  element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/send" element={<SendMoney/>}/>
            
            <Route path="/transactions" element={<Transactions />}/>
            <Route path="status" element={<Status />}/>
          </Routes>
       </BrowserRouter>
       </RecoilRoot>
    </>
  )
}

export default App
