/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import Main from '@/components/molecules/Main';
// import Textarea from '@/components/atoms/TextArea';
// import Config from '@/components/molecules/Config';

// export default function App() {
//   return (
//     <>
//       <header className="flex items-center justify-center font-mono py-4">
//         <h1 className="text-4xl">Graph Painter</h1>
//       </header>
//       <section className="w-full space-x-7 flex justify-center min-w-[1520px] h-[700px] m-auto">
//         <aside>
//           <Textarea />
//           <Config />
//         </aside>
//         <Main />
//       </section>
//     </>
//   );
// }

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { SimulationNodeDatum } from 'd3-force';
import type { Selection } from 'd3-selection';
import { miserbles } from '@/__mock__';

export default function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    const svg = d3.select(svgRef.current).attr('style', 'border: 1px solid red;');

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', 1.5)
      .attr('stroke-linecap', 'round')
      .selectAll('line')
      .data(miserbles.links)
      .join('line');

    const node = svg
      .append('g')
      .attr('fill', 'red')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(miserbles.nodes)
      .join('circle')
      .attr('r', 10)
      .call(
        d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended) as (
          selection: Selection<any | SVGCircleElement, { id: string; group: number }, SVGGElement, unknown>,
        ) => void,
      );

    const ticked = () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
    };

    const simulation = d3
      .forceSimulation(miserbles.nodes as SimulationNodeDatum[])
      .force(
        'link',
        d3
          .forceLink(miserbles.links)
          .id((d: any) => d.id)
          .distance(50),
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('x', d3.forceX(300))
      .force('y', d3.forceY(300))
      .on('tick', ticked);
  }, []);

  return (
    <main className="flex justify-center items-center	 border border-red-500">
      <svg width="600" height="600" viewBox="0 0 600 600" ref={svgRef} />
    </main>
  );
}
