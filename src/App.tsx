import Main from '@/components/molecules/Main';
import Textarea from '@/components/atoms/TextArea';
import Config from '@/components/molecules/Config';

export default function App() {
  return (
    <>
      <header className="flex items-center justify-center py-4">
        <h1 className="text-4xl">Graph Painter</h1>
      </header>
      <section className="w-full space-x-7 flex justify-center min-w-[1520px] h-[700px] m-auto">
        <aside>
          <Textarea />
          <Config />
        </aside>
        <main className="w-[600px] h-[600px] border border-main-color rounded-xl">
          <Main />
        </main>
      </section>
    </>
  );
}
