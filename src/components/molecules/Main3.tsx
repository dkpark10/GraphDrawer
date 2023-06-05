/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { SimulationNodeDatum, SimulationLinkDatum, Simulation } from 'd3-force';
import type { Selection, BaseType } from 'd3-selection';
import type { D3DragEvent } from 'd3-drag';
import { shallow } from 'zustand/shallow';
import { useGraphStore } from '@/store/graph';
import { Node, AttrType } from '@/types/graph';
import { useArrowStore, useShortestPathStore } from '@/store';
import { MAIN_COLOR, SECOND_COLOR } from '@/constants';

type DragEvent = D3DragEvent<Element, SimulationNodeDatum, SimulationNodeDatum>;

const arrowMarkId = 'arrow';
const WIDTH = 600;
const HEIGHT = 600;

interface CustomLink {
  source: SimulationNodeDatum;
  target: SimulationNodeDatum;
  index?: number | undefined;
}

/** @todo 선언형으로 바꿔보자.. */
export default function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const { nodes, links } = useGraphStore((state) => state, shallow);

  const isArrow = useArrowStore((state) => state.isArrow);

  const shortestPath = useShortestPathStore(({ from, to, path }) => ({ from, to, path }), shallow);

  const [simulationNodes, setSimulationNodes] = useState<Array<SimulationNodeDatum & Node>>([]);

  const [simulationLinks, setSimulationLinks] = useState<Array<SimulationLinkDatum<SimulationNodeDatum>>>([]);

  const simulationRef = useRef<Simulation<d3.SimulationNodeDatum & Node, undefined>>();

  useEffect(() => {
    if (!svgRef.current || nodes.length <= 0 || links.length <= 0) {
      return undefined;
    }

    const forceLink = d3
      .forceLink(links)
      .id((d: SimulationNodeDatum) => (d as Node).id)
      .distance(140);

    simulationRef.current = d3
      .forceSimulation(nodes as Array<SimulationNodeDatum & Node>)
      .force('link', forceLink)
      .force('charge', d3.forceManyBody().strength(-240))
      .force('x', d3.forceX(WIDTH / 2))
      .force('y', d3.forceY(HEIGHT / 2));

    simulationRef.current.on('tick', function tick() {
      // eslint-disable-next-line react/no-this-in-sfc
      const simulationNodesData = this.nodes().map((node) => ({
        ...node,
        id: node.id,
      }));
      setSimulationNodes(simulationNodesData);
      setSimulationLinks([...forceLink.links()]);
    });

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [links, nodes]);

  return (
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} ref={svgRef}>
      <defs>
        <marker
          id={arrowMarkId}
          viewBox="0 0 10 10"
          refX="23"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={MAIN_COLOR} />
        </marker>
      </defs>
      {simulationLinks.map((link, index) => {
        const { source, target } = link as CustomLink;
        const pathId = `edge-path-${index}`;

        return (
          <g key={link.index}>
            <path
              id={pathId}
              d={`M ${source.x} ${source.y} L ${target.x} ${target.y} z`}
              strokeWidth="2"
              stroke={MAIN_COLOR}
              markerEnd={isArrow === true ? `url(#${arrowMarkId})` : ''}
            />
            <text
              id={pathId}
              className="pointer-events-none"
              dy="-4"
              dx="60"
              fontSize="15"
              fill={MAIN_COLOR}
              textAnchor="middle"
            >
              <textPath xlinkHref={`#${pathId}`} className="pointer-events-none">
                {link.index}
              </textPath>
            </text>
          </g>
        );
      })}
      {simulationNodes.map((node) => (
        <g key={node.index}>
          <circle
            className="cursor-pointer"
            cx={node.x}
            cy={node.y}
            r={20}
            fill={MAIN_COLOR}
            strokeWidth={2.5}
            stroke={MAIN_COLOR}
            key={node.index}
          />
          <text
            className="pointer-events-none"
            x={node.x}
            y={node.y}
            dy=".35em"
            fontSize="15"
            fill="white"
            textAnchor="middle"
          >
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );
}
