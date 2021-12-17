import { Provider } from "react-redux";
import Appbar from "components/Appbar";
import store from "redux/store";
import "styles/globals.css";
import "styles/app.css";
import "styles/utils.css";
import "styles/home.css";
import "styles/appbar.css";
import "styles/loading.css";
import "styles/login.css";
import "styles/register.css";
import "styles/memories.css";
import "styles/modal.css";
import "styles/loading-button.css";
import axios from "axios";

axios.defaults.withCredentials = true;

const App = ({ Component }) => {
  return (
    <div className="app__container">
      <Provider store={store}>
        <Appbar />
        <Component />
      </Provider>
    </div>
  );
};
export default App;
