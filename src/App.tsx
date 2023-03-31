import './styles/App.css';
import Aside from './components/templates/Aside';
import Main from './components/molecules/Main';

export default function App() {
  return (
    <>
      <header>
        <h1>Graph Painter</h1>
      </header>
      <div className="container">
        <Aside />
        <Main />
      </div>
    </>
  );
}
