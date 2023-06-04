import './App.css';
import Weather from './Components/Weather/Weather';

function App() {
  const styles = {
    container: {
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/rain.jpeg'})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh' //ht
    }
  };
  return (
    <div style={styles}>
      <Weather />
    </div>
  );
}

export default App;
