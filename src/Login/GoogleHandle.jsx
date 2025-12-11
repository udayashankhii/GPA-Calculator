import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts/google-login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: googleToken }),
        }
      );

      const data = await res.json();

      if (!res.ok) return toast.error(data.error || "Google login failed");

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("role", data.role);

      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      toast.error("Google login error");
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <GoogleLogin onSuccess={handleSuccess} onError={() => toast.error("Google login failed")} />
    </div>
  );
}
