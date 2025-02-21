import { Route, Routes } from "react-router-dom";
import { Registration } from "./components/Registration";
import { ForgotPassword } from "./components/ForgotPassword";
import { Login } from "./components/Login";
import { AuthLayout } from "./AuthLayout";
import { EmailVerify } from "./components/EmailVerify";

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="verify-email" element={<EmailVerify />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
