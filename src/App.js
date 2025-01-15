import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import PatientList from './components/PatientList'
import DiseaseList from './components/DiseaseList'
import PatientForm from './components/PatientForm'
import DiseaseForm from './components/DiseaseForm'
import NavBar from './components/NavBar'
function App() {
  return (
    <div className="App">
        <Router>
            <NavBar/>
            <Routes>
                <Route path="patient" element={<PatientForm/>}>
                    <Route path=":patId" element={<PatientForm/>}/>
                </Route>
                <Route path="patients" element={<PatientList/>}>

                </Route>
                <Route path="diseases" element={<DiseaseList/>}>

                </Route>
                <Route path="disease" element={<DiseaseForm/>}>
                    <Route path=":id" element={<DiseaseForm/>}/>
                </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
