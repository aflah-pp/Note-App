import Form from "../components/Form";
import { HOST_URL } from "../constants/Constants";

function Register() {
  return <Form route={`${HOST_URL}/api/user/register/`} method="register" />;
}

export default Register;
