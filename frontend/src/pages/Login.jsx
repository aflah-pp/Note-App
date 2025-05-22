import Form from "../components/Form"; 
import { HOST_URL } from "../constants/Constants";

function Login() {
  return <Form route={`${HOST_URL}/api/token/`} method="login" />;
}

export default Login;
