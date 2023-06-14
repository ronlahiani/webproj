import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Login from './components/Login'
import WorkerScreen from './components/WorkerScreen';
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
      <Routes>
      <Route path="/worker" element={<WorkerScreen/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
