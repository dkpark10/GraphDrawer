// import { containerStyle, headerStyle } from './styles/styles.css';
import Aside from './components/templates/Aside';
import Main from './components/molecules/Main';

export default function App() {
  return (
    <>
      <header className="flex items-center justify-center font-mono py-4">
        <h1 className="text-4xl">Graph Painter</h1>
      </header>
      <div className="container">
        <Aside />
        <Main />
      </div>
    </>
  );
}
