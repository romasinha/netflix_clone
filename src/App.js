
import './App.css';
import requests  from './requests';
import Row from './Row';

function App() {
  return (
    <div className="App">
      <h2>Netflix Clone</h2>
      <Row title = "NETFLIX ORIGINALS" fetchUrl = {requests.fetchNetflixOriginals}/>
      <Row title = "Trending Now" fetchUrl = {requests.fetchTrending}/>
    </div>
  );
}

// api key: 0aadff3eb8836eed8c5ef39208bf1050

export default App;
