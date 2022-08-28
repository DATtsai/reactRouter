import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './Context';
import { useForm } from 'react-hook-form';

function SignUp() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log({user: data});
    const api = 'https://todoo.5xcamp.us/users';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(api, {
      method: 'POST',
      headers,
      body: JSON.stringify({user: data}),
    })
      .then(response => {
        setToken(response.headers.get('authorization')); // 將api回傳的jwt token儲入token
        return response.json();
      })
      .then(response => {
        navigate('/todo');
      })
  }
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>註冊帳號</h2>
        <label htmlFor="email"></label>
        <input type="text" placeholder='請輸入email' {
          ...register('email', { required: {value: true, message: '必填'}, pattern: {value: /^\S+@\S+$/i, message: 'email格式有誤'}})
        }/>
        <p style={{color: 'red'}}>{errors.email?.message}</p>
        <label htmlFor="nickname"></label>
        <input type="text" placeholder='請輸入暱稱' {
          ...register('nickname', {})
        }/>
        <p style={{color: 'red'}}>{errors.nickname?.message}</p>
        <label htmlFor="password"></label>
        <input type="text" placeholder='請輸入密碼' {
          ...register('password', { required: {value: true, message: '必填'}, minLength: {value: 6, message: '長度至少6碼'}})
        }/>
        <p style={{color: 'red'}}>{errors.password?.message}</p>
        <input type="submit" value="註冊" />
        <br />
        <Link to='/'>回到首頁</Link>
      </form>
    </main>
  );
}

export default SignUp;