import React, { useRef, useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import "../css/inputs.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

  const mailRef = useRef("");
  const passRef = useRef("");
    const valid_passRef = useRef("");
    const [signOrLogin, setSignOrLogin] = useState(
      location.pathname.includes("sign-up") ? 1:0
    );

    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
      if (loading) {
        window.location.reload();
      } else {
        console.log('page already loaded');
      }
    }, [loading]);


    const sendLogin = () => {
        const user = {
          mail: mailRef.current.value,
          pass: passRef.current.value,
        };
        if (signOrLogin) {
          sessionStorage.setItem("user connect", 1);
          sessionStorage.setItem("user", 2);//שמירת הנתונים ב sessionstorage
          setLoading(true)
          navigate("/Home");
          if (passRef.current.value === valid_passRef.current.value) {
            // axios
            //   .post("http://127.0.0.1:5000/", user)
            //   .then((res) => {
            //     console.log(res.data);
            //     sessionStorage.setItem("user connect", 1);
            //     sessionStorage.setItem("user", res.data._id);//שמירת הנתונים ב sessionstorage
            //     navigate("/Home"); //מנווט ל HOME
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //     //alert("משתמש קיים במערכת, נא הרשם");
            //     alert("שגיאת התחברות");
            //     mailRef.current.value = "";
            //     passRef.current.value = "";
            //   });
          } else {
            alert("הסיסמאות שהקשת אינן זהות, אנא נסה שנית");
            mailRef.current.value = "";
            passRef.current.value = "";
          }
        } else {
          // sessionStorage.setItem("user connect", 1);
          // sessionStorage.setItem("user", 2);//שמירת הנתונים ב sessionstorage
          // sendLogin(true);
          // navigate("/Home");
          axios
            .post("http://127.0.0.1:5000/log_in", user)
            .then((res) => {
              console.log(res.data);
              sessionStorage.setItem("user connect", 1);
              sessionStorage.setItem("user", res.data._id);
              navigate("/Home");
            })
            .catch((err) => {
              console.log(err);
              alert("שם המשתמש או הסיסמא אינם נכונים");
              mailRef.current.value = "";
              passRef.current.value = "";
            });
        }
      };
  return (
    <div className="bodyLogin">
      <Form className="formInput" sm="10">
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              ref={mailRef}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passRef}
            />
          </Col>
        </Form.Group>
        {signOrLogin > 0 && //אם הטופס במצב הרשמה הצג-
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Validate Password
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="password"
              placeholder="Password"
              ref={valid_passRef}
            />
          </Col>
        </Form.Group>
        }
        <Col sm="10">
          <Button onClick={sendLogin}>שלח</Button>
        </Col>
      </Form>
    </div>
  );
}
