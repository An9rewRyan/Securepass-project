import {AuthForm} from './AuthForm'

class SigninForm extends AuthForm {
    constructor(props) {
      super(props);
      this.url = "http://127.0.0.1:8000/signin"
    }
  }
 
export default SigninForm