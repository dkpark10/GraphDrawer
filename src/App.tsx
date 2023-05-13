import Aside from './components/templates/Aside';
import Main from './components/molecules/Main';

export default function App() {
  return (
    <>
      <header className="flex items-center justify-center font-mono py-4">
        <h1 className="text-4xl">Graph Painter</h1>
      </header>
      <section className="w-full space-x-7 flex justify-center min-w-[1520px] h-[700px] m-auto">
        <Aside />
        <Main />
      </section>
    </>
  );
}
