import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import ModifyPage from "./pages/ModifyPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div>
      <Header />
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/post" exact={true} component={PostPage} />
      <Route path="/post/:id" exact={true} component={ModifyPage} />
      <Route path="/post/detail/:id" exact={true} component={DetailPage} />
    </div>
  );
}

export default App;
