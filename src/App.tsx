/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
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

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';
import type { Selection } from 'd3-selection';
import type { D3DragEvent } from 'd3-drag';

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

type DragEvent = D3DragEvent<Element, SimulationNodeDatum, SimulationNodeDatum>;

export default function App({ nodeList }: AppProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || nodeList.nodes.length <= 0 || nodeList.links.length <= 0) {
      return;
    }

    const dragStarted = (event: DragEvent) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    };

    const dragged = (event: DragEvent) => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    };

    const dragEnded = (event: DragEvent) => {
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
      .selectAll('path')
      .data(nodeList.links)
      .join('path')
      .attr('id', (_, i) => `edge-path-${i}`)
      .attr('marker-end', 'url(#arrow)');

    const node = svg
      .append('g')
      .attr('fill', '#060724')
      .attr('class', 'cursor-pointer')
      .attr('stroke', '#060724')
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 2.5)
      .selectAll('circle')
      .data(nodeList.nodes)
      .join('circle')
      .attr('r', 20)
      .on('mouseenter', function hover() {
        d3.select(this).attr('fill', 'rgb(251, 194, 44)');
      })
      .on('mouseleave', function hover() {
        d3.select(this).attr('fill', '#060724');
      })
      .call(
        d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded) as (
          selection: Selection<any | SVGCircleElement, Node & SimulationNodeDatum, SVGGElement, unknown>,
        ) => void,
      );

    const text = svg
      .append('g')
      .attr('class', 'pointer-events-none')
      .attr('fill', 'white')
      .attr('fontSize', 12)
      .selectAll('text')
      .data(nodeList.nodes)
      .join('text')
      .attr('textAnchor', 'middle')
      .attr('dy', 6)
      .attr('dx', -4)
      .text(6);

    const costText = svg
      .append('g')
      .attr('class', 'pointer-events-none')
      .attr('fill', 'pink')
      .attr('fontSize', 14)
      .selectAll('.cost-text')
      .data(nodeList.links)
      .join('text')
      .attr('textAnchor', 'middle')
      .attr('dy', -4)
      .attr('dx', 38)
      .attr('id', (_, i) => `edge-path-${i}`);

    costText
      .append('textPath')
      .attr('xlink:href', (_, i) => `#edge-path-${i}`)
      .style('pointer-events', 'none')
      .text('edge');

    const simulation = d3
      .forceSimulation(nodeList.nodes as SimulationNodeDatum[])
      .force(
        'link',
        d3
          .forceLink(nodeList.links)
          .id((d: any) => d.id as string)
          .distance(120),
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('x', d3.forceX(300))
      .force('y', d3.forceY(300))
      .on('tick', () => {
        link.attr(
          'd',
          (d: SimulationLinkDatum<any>) =>
            `M ${d.source.x as number} ${d.source.y as number} L ${d.target.x as number} ${d.target.y as number}`,
        );
        // link
        //   .attr('x1', (d: SimulationLinkDatum<any>) => d.source.x as number)
        //   .attr('y1', (d: SimulationLinkDatum<any>) => d.source.y as number)
        //   .attr('x2', (d: SimulationLinkDatum<any>) => d.target.x as number)
        //   .attr('y2', (d: SimulationLinkDatum<any>) => d.target.y as number);

        node
          .attr('cx', (d: SimulationNodeDatum) => d.x as number)
          .attr('cy', (d: SimulationNodeDatum) => d.y as number);
        text.attr('x', (d: SimulationNodeDatum) => d.x as number).attr('y', (d: SimulationNodeDatum) => d.y as number);
      });
  }, [nodeList?.nodes, nodeList?.links]);

  return (
    <main className="flex justify-center items-center	 border border-red-500">
      <svg width="600" height="600" viewBox="0 0 600 600" ref={svgRef} />
    </main>
  );
}

// import "./styles.css";
// import * as d3 from "d3";
// import { useEffect, useMemo, useState } from "react";

// function ForceGraph({ nodes, links }) {
//   const [animatedNodes, setAnimatedNodes] = useState([]);

//   const [animatedLinks, setAnimatedLinks] = useState([]);

//   // re-create animation every time nodes change
//   useEffect(() => {
//     const simulation = d3
//       .forceSimulation(nodes)
//       .force("x", d3.forceX(400))
//       .force("y", d3.forceY(400))
//       .force(
//         "link",
//         d3
//           .forceLink(links)
//           .id((d) => d.id)
//           .distance(120)
//       )
//       .force("charge", d3.forceManyBody().strength(-100))
//       .force("collision", d3.forceCollide(5));

//     const forceLink = d3
//       .forceLink(links)
//       .id((l) => l.id)
//       .distance(120);

//     // update state on every frame
//     simulation.on("tick", () => {
//       setAnimatedNodes([...simulation.nodes()]);
//       setAnimatedLinks([...forceLink.links()]);
//     });

//     // slow down with a small alpha
//     simulation.alpha(0.1).restart();

//     // stop simulation on unmount
//     return () => simulation.stop();
//   }, [nodes, links]);

//   console.log(animatedLinks);
//   return (
//     <g>
//       {animatedNodes.map((node) => (
//         <circle
//           cx={node.x}
//           cy={node.y}
//           r={10}
//           key={node.id}
//           stroke="black"
//           fill="transparent"
//         />
//       ))}
//       {animatedLinks.map((link) => (
//         <line
//           stroke="black"
//           x1={link.source.x}
//           y1={link.source.y}
//           x2={link.target.x}
//           y2={link.target.y}
//         />
//       ))}
//     </g>
//   );
// }

// export default function App() {
//   const [charge, setCharge] = useState(-3);

//   const miserbles = useMemo(
//     () => ({
//       nodes: [
//         { id: "Myriel", group: 1 },
//         { id: "Napoleon", group: 1 },
//         { id: "Mlle.Baptistine", group: 1 },
//         { id: "Mme.Magloire", group: 1 },
//         { id: "CountessdeLo", group: 1 },
//         { id: "Geborand", group: 1 },
//         { id: "Champtercier", group: 1 }
//       ],
//       links: [
//         { source: "Mlle.Baptistine", target: "Myriel", value: 8 },
//         { source: "Mme.Magloire", target: "Myriel", value: 10 },
//         { source: "Mme.Magloire", target: "Mlle.Baptistine", value: 6 },
//         { source: "CountessdeLo", target: "Myriel", value: 1 },
//         { source: "Napoleon", target: "Myriel", value: 1 },
//         { source: "Geborand", target: "Myriel", value: 1 },
//         { source: "Champtercier", target: "Myriel", value: 1 }
//       ]
//     }),
//     []
//   );

//   return (
//     <div className="App">
//       <h1>React & D3 force graph</h1>
//       <p>Current charge: {charge}</p>
//       <input
//         type="range"
//         min="-30"
//         max="30"
//         step="1"
//         value={charge}
//         onChange={(e) => setCharge(e.target.value)}
//       />
//       <svg width="800" height="800" viewBox="0 0 800 800">
//         <ForceGraph
//           nodes={miserbles.nodes}
//           links={miserbles.links}
//           charge={charge}
//         />
//       </svg>
//     </div>
//   );
// }
