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
import type { Selection, BaseType } from 'd3-selection';
import type { D3DragEvent } from 'd3-drag';
import { shallow } from 'zustand/shallow';
import { useGraphStore } from '@/store/graph2';
import { GraphData, Node, Edge, AttrType } from '@/types/graph';
import { useArrowStore } from '@/store';

type DragEvent = D3DragEvent<Element, SimulationNodeDatum, SimulationNodeDatum>;

const arrowMarkId = 'arrow';

export default function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const { nodes, links } = useGraphStore((state) => state, shallow);

  const isArrow = useArrowStore((state) => state.isArrow);

  useEffect(() => {
    if (!svgRef.current || nodes.length <= 0 || links.length <= 0) {
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
      .attr('id', arrowMarkId)
      .attr('viewBox', '0 0 10 10')
      .attr('refX', '26')
      .attr('refY', '5')
      .attr('markerWidth', '8')
      .attr('markerHeight', '8')
      .attr('orient', 'auto-start-reverse');

    const marker = d3.select(`#${arrowMarkId}`);
    marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z').attr('fill', '#020617');

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', 1.5)
      .attr('stroke-linecap', 'round')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('id', (_, i) => `edge-path-${i}`)
      .attr('marker-end', !isArrow ? `url(#${arrowMarkId})` : '');

    const node = svg
      .append('g')
      .attr('fill', '#060724')
      .attr('class', 'cursor-pointer')
      .attr('stroke', '#060724')
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 2.5)
      .selectAll('circle')
      .data(nodes)
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
          selection: Selection<BaseType | SVGCircleElement, Node & SimulationNodeDatum, SVGGElement, unknown>,
        ) => void,
      );

    const text = svg
      .append('g')
      .attr('class', 'pointer-events-none')
      .attr('fill', 'white')
      .attr('fontSize', 12)
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('textAnchor', 'middle')
      .attr('dy', 6)
      .attr('dx', -4)
      .text((d) => d.id as string);

    const costText = svg
      .append('g')
      .attr('class', 'pointer-events-none')
      .attr('fill', '#060724')
      .attr('fontSize', 14)
      .selectAll('.cost-text')
      .data(links)
      .join('text')
      .attr('textAnchor', 'middle')
      .attr('dy', -4)
      .attr('dx', 38)
      .attr('id', (_, i) => `edge-path-${i}`);

    costText
      .append('textPath')
      .attr('xlink:href', (_, i) => `#edge-path-${i}`)
      .style('pointer-events', 'none')
      .text(({ cost }) => cost);

    const simulation = d3
      .forceSimulation(nodes as Array<SimulationNodeDatum & Node>)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: SimulationNodeDatum) => (d as Node).id as string)
          .distance(140),
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('x', d3.forceX(300))
      .force('y', d3.forceY(300))
      .on('tick', () => {
        link.attr(
          'd',
          (d: AttrType) =>
            `M ${d.source.x as number} ${d.source.y as number} L ${d.target.x as number} ${d.target.y as number}`,
        );

        node.attr('cx', (d: AttrType) => d.x as number).attr('cy', (d: AttrType) => d.y as number);
        text.attr('x', (d: AttrType) => d.x as number).attr('y', (d: AttrType) => d.y as number);
      });
  }, [nodes, links, isArrow]);

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
