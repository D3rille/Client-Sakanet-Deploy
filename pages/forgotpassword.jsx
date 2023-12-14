
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import OTPInput from "../components/ResetPassword/OTPInput";
import Reset from "../components/ResetPassword/Reset";
import EmailInput from "../components/ResetPassword/EmailInput";

function App() {
  const router = useRouter();
  const [variables, setVariables] = useState({
    page: "",
    email: "",
    otp: "",
  });

  function handleChange(event) {
      const { name, value } = event.target;
      setVariables((prevVariables) => ({
        ...prevVariables,
        [name]: value,
      }));
    console.log(variables)

  }
  function NavigateComponents() {
    if (variables.page === "OTPInput") return <OTPInput  handleChange={handleChange} variables={variables}/>;
    if (variables.page === "reset") return <Reset  variables={variables} />;
    return <EmailInput  handleChange={handleChange} variables={variables} />;
  }

  return (
      <div className="flex justify-center items-center">
        <NavigateComponents />
      </div>
  );
}

export default App;
