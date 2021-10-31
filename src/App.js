
import Footer from "./Components/Footer";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Singlepost from "./Components/Singlepost";
import CreatePost from "./Components/CreatePost";
import UserPosts from "./Components/UserPosts";
import EditPost from "./Components/EditPost";
import UserProfile from "./Components/UserProfile";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HomePage from "./Components/HomePage";
import Settings from "./Components/Settings";
import Forgotpassword from "./Components/Forgotpassword";
import ChangePassword from "./Components/ChangePassword";
function App() {


  return (
    <BrowserRouter>
      <Switch>
      <Route path ="/" exact = "true" component={HomePage}/>
      <Route path="/singlePost/:id" id="id" component={Singlepost} />
      <Route path="/createPost" exact = "true"  component ={CreatePost}/>
      <Route path ="/userPosts" component ={UserPosts} />
      <Route path="/editPost/:id" id = "id" component ={EditPost} />
      <Route path ="/userProfile/:id" id="id" component={UserProfile}/>
      <Route path ='/login' component ={Login}/>
      <Route path ='/register' component ={Register}/>
      <Route path="/settings" component={Settings}/>
      <Route
            path="/forgotPassword"
            exact={true}
            component={Forgotpassword}
          />
           <Route
            path="/authors/password-reset/:userId/:token"
            exact={true}
            component={ChangePassword}
            url="/authors/password-reset/:userId/:token"
          />
      </Switch>
      <Footer
        title="Blogging App"
        
      />

    </BrowserRouter>
  );
}

export default App;
