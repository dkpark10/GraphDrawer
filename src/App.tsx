/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
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

// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

// interface Node {
//   id?: string;
//   group?: number;
// }

// interface Edge {
//   source?: string;
//   target?: string;
//   value?: number;
// }

// interface AppProps {
//   nodeList: {
//     nodes: Array<Node & SimulationNodeDatum>;
//     links: Array<Edge & SimulationLinkDatum<SimulationNodeDatum>>;
//   };
// }

// export default function App({ nodeList }: AppProps) {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     if (!svgRef.current || nodeList.nodes.length <= 0) {
//       return;
//     }

//     d3.forceSimulation(nodeList.nodes as SimulationNodeDatum[])
//       .force(
//         'link',
//         d3
//           .forceLink(nodeList.links)
//           .id((d: any) => d.id)
//           .distance(500),
//       )
//       .force('charge', d3.forceManyBody().strength(-100))
//       .force('x', d3.forceX(300))
//       .force('y', d3.forceY(300))
//       .on('tick', () => {
//         setMounted(true);
//       });
//   }, [nodeList.nodes, nodeList.links]);

//   return (
//     <main className="flex justify-center items-center	 border border-red-500">
//       <svg width="600" height="600" viewBox="0 0 600 600" ref={svgRef}>
//         {mounted &&
//           nodeList.links.map(({ source, target }, idx) => {
//             return (
//               <g key={idx}>
//                 <defs>
//                   <marker
//                     id="arrow"
//                     viewBox="0 0 10 10"
//                     refX="24"
//                     refY="5"
//                     markerWidth="8"
//                     markerHeight="8"
//                     orient="auto-start-reverse"
//                   >
//                     <path d="M 0 0 L 10 5 L 0 10 z" fill="#020617" />
//                   </marker>
//                 </defs>
//                 <path
//                   d={`M ${(source as SimulationNodeDatum).x} ${(source as SimulationNodeDatum).y} L ${
//                     (target as SimulationNodeDatum).x
//                   } ${(target as SimulationNodeDatum).y}`}
//                   strokeWidth="2"
//                   stroke="yellow"
//                   markerEnd="url(#arrow)"
//                 />
//                 {/* <text
//                   className="pointer-events-none"
//                   y={22}
//                   x={22}
//                   dx=".3em"
//                   dy=".9em"
//                   fontSize="14"
//                   fill="pink"
//                   textAnchor="right"
//                 >
//                   {idx}
//                 </text> */}
//               </g>
//             );
//           })}
//         {mounted &&
//           nodeList?.nodes.map((node, idx) => {
//             console.log(node.y, node.x);
//             return (
//               <g className="cursor-pointer" key={idx}>
//                 <circle cy={node.y} cx={node.x} r="22" fill="red" stroke="blue" strokeWidth="2.5" />
//                 {/* <text
//                   y={node.y}
//                   x={node.x}
//                   className="pointer-events-none"
//                   dy=".35em"
//                   fontSize="15"
//                   fill="white"
//                   textAnchor="middle"
//                 >
//                   {node.id}
//                 </text> */}
//               </g>
//             );
//           })}
//       </svg>
//     </main>
//   );
// }

// --------------------------------------------------------------------------------------------------------------------------------
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';
import type { Selection } from 'd3-selection';
import { miserbles } from '@/__mock__';

interface Node {
  id?: string;
  group?: number;
}

interface Edge {
  source?: string;
  target?: string;
  value?: number;
}

interface AppProps {
  nodeList: {
    nodes: Array<Node & SimulationNodeDatum>;
    links: Array<Edge & SimulationLinkDatum<SimulationNodeDatum>>;
  };
}

export default function App({ nodeList }: AppProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const dragStarted = (event: any) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    };

    const dragged = (event: any) => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    };

    const dragEnded = (event: any) => {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    };

    const svg = d3.select(svgRef.current).attr('style', 'border: 1px solid red;');
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', '24')
      .attr('refY', '5')
      .attr('markerWidth', '8')
      .attr('markerHeight', '8')
      .attr('orient', 'auto-start-reverse');

    const marker = d3.select('#arrow');
    marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z').attr('fill', '#020617');

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', 1.5)
      .attr('stroke-linecap', 'round')
      .selectAll('line')
      .data(miserbles.links)
      .join('line')
      .attr('marker-end', 'url(#arrow)');

    const node = svg
      .append('g')
      .attr('fill', '#060724')
      .attr('class', 'cursor-pointer')
      .attr('stroke', '#060724')
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 2.5)
      .selectAll('circle')
      .data(miserbles.nodes)
      .join('circle')
      .attr('r', 20)
      .call(
        d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded) as (
          selection: Selection<any | SVGCircleElement, { id: string; group: number }, SVGGElement, unknown>,
        ) => void,
      );

    const text = svg
      .append('g')
      .attr('class', 'pointer-events-none')
      .attr('fill', 'white')
      .attr('fontSize', 12)
      .selectAll('text')
      .data(miserbles.nodes)
      .join('text')
      .attr('textAnchor', 'middle')
      .attr('dy', 6)
      .attr('dx', -4)
      .text((d: any) => 6);

    const ticked = () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
      text.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y);
    };

    const simulation = d3
      .forceSimulation(nodeList.nodes as SimulationNodeDatum[])
      .force(
        'link',
        d3
          .forceLink(nodeList.links)
          .id((d: any) => d.id)
          .distance(120),
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('x', d3.forceX(300))
      .force('y', d3.forceY(300))
      .on('tick', ticked);
  }, [nodeList?.nodes, nodeList?.links]);

  return (
    <main className="flex justify-center items-center	 border border-red-500">
      <svg width="600" height="600" viewBox="0 0 600 600" ref={svgRef} />
    </main>
  );
}
