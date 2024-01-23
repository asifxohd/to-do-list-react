import ToDoList from "./ToDoList"
import './index.css'
import Task from "./Task"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"


function App() {
	return (
	  <>
		<Router>
		  <Routes>
			<Route path="/landing" element={<Task />} />
			<Route path="/" element={<ToDoList />} />
		  </Routes>
		</Router>
	  </>
	);
  }

  export default App
