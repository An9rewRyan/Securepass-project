import {AuthForm} from './AuthForm'
import { PasswordChecker } from './PasswordCheck';

class SignupForm extends AuthForm {
    constructor(props) {
      super(props);
      this.url = "http://127.0.0.1:8000/signup"
      this.pass_handler = PasswordChecker
    }
  }
 
export default SignupForm

