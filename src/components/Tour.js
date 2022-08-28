import { Outlet } from "react-router-dom";

function Tour() {
  return (
    <>
      <h2>旅遊頁面</h2>
      <ul>
        <li>選單1</li>
        <li>選單2</li>
        <li>選單3</li>
      </ul>
      <Outlet></Outlet>
    </>
  );
}

export default Tour;