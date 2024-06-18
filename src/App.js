import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';

import Productdescscreen from './screens/Productdescscreen';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Ordersscreen from './screens/Ordersscreen';
import Orderinfo from './screens/Orderinfo';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import OpenScreen from './screens/OpenScreen';
import CategoryBar from './components/CategoryBar';
import FavoritesScreen from './screens/FavoritesScreen';
import Orderinfoadmin from './screens/Orderinfoadmin';
import AboutUs from './screens/AboutUs';
import ReturnPolicy from './screens/ReturnPolicy';


//adaugare rute
function App() {
  return (
    <div className="App">
   <Router>
        <Navbar/>
        <CategoryBar />
        
        <Routes>

         <Route path='/' element={<OpenScreen />} exact />
         <Route path='/homescreen' element={<Homescreen />} exact />
        <Route path='/product/:id' element={<Productdescscreen />} />
        <Route path='/cart' element={<Cartscreen />} />
        <Route path='/register' element={<Registerscreen />} />
        <Route path='/login' element={<Loginscreen />} />
        <Route path='/orders' element={<Ordersscreen />} />
        <Route path='/orderinfo/:orderid' element={<Orderinfo />} />
        <Route path='/profile' element={<Profilescreen />} />
        <Route path='/admin/*' element={<Adminscreen />} />
        <Route path='/favorites' element={<FavoritesScreen />} />
        <Route path='/orderinfoadmin/:orderid' element={<Orderinfoadmin />} />
        <Route path="/about-us" element={<AboutUs />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
               

        </Routes>
        </Router>
        

   
    
    </div>
  );
}

export default App;
