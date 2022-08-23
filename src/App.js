import './App.css';
import List from './components/List';
import Toast from "./components/Toast"
import Form from "./components/Form"

function App() {
  return (
    <div className="App">
      <Form />
      <List />
      <Toast id={"liveToastBtn"} main={"Výborne!"} second={"Podnet bol pridaný."}/>
    </div>
  );
}

export default App;
