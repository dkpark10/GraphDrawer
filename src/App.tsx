import './styles/App.css';
import Aside from './components/templates/Aside';
import Header from './components/templates/Header';
import Main from './components/molecules/Main';

export default function App(){
  return (
    <>
      <Header />
      <div className='container'>
        <Aside />
        <Main />
      </div>
    </>
  )
}