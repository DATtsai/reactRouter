import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import FAQ from './components/FAQ';
import Tour from './components/Tour';
import TourList from './components/TourList';
import TourDetail from './components/TourDetail';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Todo from './components/Todo';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthContext, useAuth } from "./components/Context";


function App() {
  const [token, setToken] = useState(null);
  return (
    <div className="App">
      <AuthContext.Provider value={{token, setToken}}>
        <h1>Welcome to React Router!</h1>
        {/* 路由表 */}
        <Routes>
          <Route path='/' element={<Layout token={ token }/>}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />}></Route>
            <Route path="/tour" element={<Tour />}>
              <Route index element={<TourList />}></Route> {/* index為預設路由 */}
              <Route path="sayhello" element={<SayHello />}></Route>
              <Route path=":Id" element={<TourDetail />}></Route>
            </Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/todo' element={<Todo />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
      </nav>
    </>
  );
}

function About() {
  let navigate = useNavigate();
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
        <input type="button" value="return home" onClick={(e)=> {
          navigate('/');
        }} />
      </nav>
    </>
  );
}

// function FAQ() {
//   return (
//     <>
//       <h2>FAQ</h2>
//       <Link to="/">Home</Link>
//     </>
//   );
// }

function SayHello() {
  return (
    <>
      <h2>Hi~~~~</h2>
      <Link to="/">return Home</Link>
    </>
  );
}

function NotFound() {
  return (
    <>
      <h2>不存在網址</h2>
      <Link to="/">回到首頁</Link>
    </>
  );
}

function Layout({token}) {
  return (
    <div>
      <div className='header'>表頭</div>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="/tour">Tour</Link>
        </li>
        <li>
          <Link to="/signup">signup</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          {
            token &&
            <Link to="/todo">todo</Link>
          }
        </li>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <div className='footer'>表尾</div>
    </div>
  );
}

export default App;
