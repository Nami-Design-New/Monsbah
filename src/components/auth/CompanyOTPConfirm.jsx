import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setClientData } from "../../redux/slices/clientData";
import { setShowModal } from "../../redux/slices/companySubscribe.js";
import useGetCurrentLocation from "../../hooks/settings/useGetCurrentLocation";
import OtpContainer from "../../ui/form-elements/OtpContainer";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

function CompanyOTPConfirm({ formData, setFormData, setFormType, setShow }) {
  const { t } = useTranslation();
  const { data } = useGetCurrentLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [, setCookie] = useCookies(["token", "id"]);

  const [otpVerifyCode, setOtpVerifyCode] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendDisabled(true);
    setLoading(true);
    const payload = { ...formData, new_version: 1 };
    payload.phone = formData.country_code + formData.phone;

    try {
      const res = await axiosInstance.post(
        "/company/auth/sign-up/resend-verify-phone",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        toast.success(t("otpResendSuccess"));
      }
    } catch (error) {
      toast.error(t("otpResendFail"));
      throw new Error(error);
    } finally {
      setLoading(false);
      setTimer(60);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post(
        "company/auth/sign-up/verify-phone",
        {
          ...formData,
          phone: formData.country_code + formData.phone,
          new_version: 1,
          otp: +otpVerifyCode.code,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        const loginRes = await axiosInstance.post("/company/auth/login", {
          phone: formData.country_code + formData.phone,
          password: formData.password,
          country_code: formData.country_code,
          fcm_token: formData.fcm_token,
        });
        if (loginRes.status === 200) {
          dispatch(setClientData(res.data?.data.client_data));
          setCookie("token", res.data?.data.token, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          setCookie("id", res.data?.data.client_data.id, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          toast.success(res.data?.message);
          queryClient.invalidateQueries();
          navigate("/");
          const updatedParams = new URLSearchParams(searchParams);
          updatedParams.delete("redirect");
          setSearchParams(updatedParams);
          setShow(false);
          dispatch(setShowModal(true));
          setFormData({
            name: "",
            username: "",
            country_code: data?.country_code,
            phone: "",
            email: "",
            password: "",
            password_confirmation: "",
            country_id: "",
            city_id: "",
            state_id: "",
            fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
            gender: "",
          });
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="form " onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="head">{t("auth.confirmOTPTitle")} </h2>
          <p className="sub-head">{t("auth.confirmOTPSubtitle")}</p>
        </div>

        <div>
          <OtpContainer
            formData={otpVerifyCode}
            setFormData={setOtpVerifyCode}
          />
        </div>

        <div className="resend-code">
          <span className={`resend_link ${resendDisabled ? "disabled" : ""}`}>
            {t("auth.didnotReceiveCode")}
            <span
              className=""
              style={{ cursor: "pointer" }}
              onClick={handleResend}
            >
              {t("auth.resendCode")}
            </span>
          </span>
          <div
            className="timer flex-row-reverse"
            style={{ justifyContent: "end !important" }}
          >
            <span>
              {Math.floor(timer / 60)
                .toString()
                .padStart(2, "0")}
            </span>
            :<span>{(timer % 60).toString().padStart(2, "0")}</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            aria-label="Back"
            className="back_btn"
            onClick={(e) => {
              e.preventDefault();
              setFormType("register-company");
            }}
          >
            <i className="fal fa-arrow-right"></i>
          </button>
          <div className="w-100">
            <SubmitButton name={t("auth.verify")} loading={loading} />
          </div>
        </div>
      </form>
    </>
  );
}

export default CompanyOTPConfirm;
