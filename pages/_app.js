import Appbar from 'components/Appbar'
import AddMemory from 'components/AddMemory'
import { Provider } from 'react-redux'
import store from 'redux/store'
import 'styles/globals.css'
import 'styles/utils.css'
import 'styles/home.css'
import 'styles/appbar.css'
import 'styles/loading.css'
import 'styles/login.css'
import 'styles/register.css'
import 'styles/memories.css'
import 'styles/addmemory.css'

const App = ({ Component, ...pageProps }) => {
  return (
    <Provider store={store}>
      <Appbar />
      <Component {...pageProps} />
    </Provider>
  )
}
export default App
