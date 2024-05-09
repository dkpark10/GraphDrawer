import Main from '@/components/molecules/Main';
import Main3 from '@/components/molecules/Main3';
import Textarea from '@/components/atoms/TextArea';
import Config from '@/components/molecules/Config';
// eslint-disable-next-line import/extensions
import packageInfo from '../package.json';

export default function App() {
  return (
    <>
      <span className="hidden" data-version={packageInfo.version ?? '2.3.0'} />
      <header className="flex items-center justify-center py-4 min-w-[1000px]">
        <h1 className="text-4xl flex items-center">
          <img className="w-8 h-8" alt="main-img" src="graphpaintericon.png" />
          Graph Painter
        </h1>
      </header>
      <section className="w-full space-x-7 flex justify-center min-w-[1000px] h-[700px] m-auto">
        <aside>
          <Textarea />
          <Config />
        </aside>
        <main className="w-[600px] h-[600px] border border-main-color rounded-xl">
          <Main3 />
        </main>
      </section>
    </>
  );
}
