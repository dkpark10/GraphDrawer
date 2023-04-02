import './styles/App.css';
import { containerStyle, headerStyle } from './styles/styles.css';
import Aside from './components/templates/Aside';
import Main from './components/molecules/Main';

export default function App() {
  return (
    <>
      <header className={headerStyle}>
        <h1>Graph Painter</h1>
      </header>
      <div className={containerStyle}>
        <Aside />
        <Main />
      </div>
    </>
  );
}
