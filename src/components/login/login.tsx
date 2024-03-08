// ... (diğer importlar)

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Button } from "baseui/button";
import { useSignIn } from "react-auth-kit";

import {
  Container,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";
import { HeadingXXLarge } from "baseui/typography";

const staticUser = {
  email: "test@example.com",
  password: "testpassword",
};

function Login(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  // Yönlendirme efekti için useEffect'i kullanın
  useEffect(() => {
    const port = "5173"; // Yönlendireceğiniz port numarası
    const redirectUrl = `http://localhost:${port}/`;

    if (props.isAuthenticated) {
      window.location.href = redirectUrl;
    }
  }, [props.isAuthenticated]);

  const onSubmit = async (values: any) => {
    console.log("Values: ", values);
    setError("");

    try {
      // Statik kullanıcı bilgileri ile giriş simülasyonu yapılıyor
      if (
        values.email === staticUser.email &&
        values.password === staticUser.password
      ) {
        // Statik giriş başarılı ise, bir token oluşturabilirsiniz.
        const staticToken = "your_static_token_here";

        // Oluşturulan statik token ile oturumu başlat
        signIn({
          token: staticToken,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: values.email },
        });

        // Başarılı giriş sonrasında sayfa yönlendirmesi
        const port = "5173"; // Yönlendireceğiniz port numarası
        const redirectUrl = `http://localhost:${port}/`;

        window.location.href = redirectUrl; // Belirttiğiniz adrese yönlendir
      } else {
        // Kullanıcı bilgileri doğrulanamazsa hata mesajı göster
        setError("Geçersiz e-posta veya şifre");
      }
    } catch (err) {
      console.log("Hata: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingXXLarge>Hoş Geldiniz!</HeadingXXLarge>
          <InputWrapper>
            <StyledInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="E-posta"
              clearOnEscape
              size="large"
              type="email"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Şifre"
              clearOnEscape
              size="large"
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
              Giriş Yap
            </Button>
          </InputWrapper>
          {error && <div style={{ color: "red" }}>{error}</div>}{" "}
          {/* Hata mesajını göster */}
        </form>
      </InnerContainer>
    </Container>
  );
}

export { Login };
