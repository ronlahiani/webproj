import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Login from './components/Login'
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header />
    <div className="pages">
    <Routes>
        <Route path='/' element={<Login/>}/>
    </Routes>
      <Routes>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
