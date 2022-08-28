import { useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from "./Context";

const MySwal = withReactContent(Swal);

function Login() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    const api = 'https://todoo.5xcamp.us/users/sign_in';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(api, {
      method: 'POST',
      headers,
      body: JSON.stringify({user: data})
    })
      .then(response => {
        console.log('login', response);
        if(response.status === 401) {
          throw new Error('login fail');
        }
        setToken(response.headers.get('authorization')); // 將api回傳的jwt token儲入token
        return response.json;
      })
      .then(response => {
        navigate('/todo');
      })
      .catch(error => {
        console.log(error);
        return MySwal.fire({title: error.message});
      })
  }

  return (
    <main>
      <h2>線上代辦事項記錄</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">email</label>
        <input type="text" placeholder='請輸入email' {
          ...register('email', { required: {value: true, message: '必填'}, pattern: {value: /^\S+@\S+$/i, message: 'email格式有誤'}})
        }/>
        <p style={{color: 'red'}}>{errors.email?.message}</p>
        <label htmlFor="password">密碼</label>
        <input type="text" placeholder='請輸入密碼' {
          ...register('password', { required: {value: true, message: '必填'}, minLength: {value: 6, message: '長度至少6碼'}})
        }/>
        <p style={{color: 'red'}}>{errors.password?.message}</p>
        <input type="submit" value="登入" />
        <br />
        <Link to='/'>回到首頁</Link>
        <Link to='/signup'>註冊帳號</Link>
      </form>
    </main>
  ); 
}

export default Login;