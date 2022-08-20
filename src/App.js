import { Routes, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import FAQ from './components/FAQ';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      {/* 路由表 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<FAQ />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
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

function NotFound() {
  return (
    <>
      <h2>不存在網址</h2>
      <Link to="/">回到首頁</Link>
    </>
  );
}

export default App;
