/* eslint-disable consistent-return */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SimulationNodeDatum, Selection, BaseType, D3DragEvent, Simulation, SimulationLinkDatum } from 'd3';
import { shallow } from 'zustand/shallow';
import { useGraphStore } from '@/store/graph';
import { Vertex } from '@/types/graph';
import { useArrowStore, useShortestPathStore } from '@/store';
import { MAIN_COLOR, SECOND_COLOR } from '@/constants';
import { useIsMounted } from '@/hooks/use-mounted';
import { isShortestEdge } from '@/services';

type DragEvent = D3DragEvent<Element, SimulationNodeDatum, SimulationNodeDatum>;

const arrowMarkId = 'arrow';
const WIDTH = 600;
const HEIGHT = 600;

interface CustomLink {
  source: SimulationNodeDatum;
  target: SimulationNodeDatum;
  index?: number | undefined;
}

export default function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isMounted = useIsMounted();
  const [, forceRender] = useReducer<(x: number) => number>((x) => x + 1, 0);

  const { nodes, links } = useGraphStore((state) => state, shallow);
  const isArrow = useArrowStore((state) => state.isArrow);
  const shortestPathState = useShortestPathStore(({ from, to, shortestPath }) => ({ from, to, shortestPath }), shallow);

  const [simulationNodes, setSimulationNodes] = useState<Array<SimulationNodeDatum & Vertex>>([]);
  const [simulationLinks, setSimulationLinks] = useState<Array<SimulationLinkDatum<SimulationNodeDatum>>>([]);
  const simulationRef = useRef<Simulation<d3.SimulationNodeDatum & Vertex, undefined>>();

  useEffect(() => {
    if (!svgRef.current) return;
    if (!isMounted) forceRender();

    const svg = d3.select(svgRef.current);
    const forceLink = d3
      .forceLink(links)
      .id((d: SimulationNodeDatum) => (d as Vertex).value)
      .distance(140);

    simulationRef.current = d3
      .forceSimulation(nodes as Array<SimulationNodeDatum & Vertex>)
      .force('link', forceLink)
      .force('charge', d3.forceManyBody().strength(-240))
      .force('x', d3.forceX(WIDTH / 2))
      .force('y', d3.forceY(HEIGHT / 2));

    svg
      .selectAll('circle')
      .data(nodes)
      .on('mouseenter', function hover() {
        d3.select(this).attr('fill', SECOND_COLOR);
      })
      .call(
        d3
          .drag()
          .on('start', function dragStarted(e: DragEvent) {
            if (!e.active) simulationRef.current?.alphaTarget(0.3).restart();
            e.subject.fx = e.subject.x;
            e.subject.fy = e.subject.y;
          })
          .on('drag', function dragged(e: DragEvent) {
            e.subject.fx = e.x;
            e.subject.fy = e.y;
          })
          .on('end', function dragEnded(e: DragEvent) {
            if (!e.active) simulationRef.current?.alphaTarget(0);
            e.subject.fx = null;
            e.subject.fy = null;
          }) as (
          selection: Selection<BaseType | SVGCircleElement, Vertex & SimulationNodeDatum, SVGGElement, unknown>,
        ) => void,
      );

    simulationRef.current.on('tick', function tick() {
      // eslint-disable-next-line react/no-this-in-sfc
      const simulationNodesData = this.nodes().map((node) => ({
        ...node,
        id: node.value,
      }));

      setSimulationNodes(simulationNodesData);
      setSimulationLinks([...forceLink.links()]);
    });

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [isMounted, nodes, links]);

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
      <g strokeOpacity={0.8} strokeLinecap="round">
        {simulationLinks.map((link, index) => {
          const { source, target } = link as CustomLink;
          const pathId = `edge-path-${index}`;
          const isShortestLink = isShortestEdge(
            (source as Vertex).value,
            (target as Vertex).value,
            shortestPathState.shortestPath,
          );

          return (
            <React.Fragment key={link.index}>
              <path
                id={pathId}
                d={`M ${source.x} ${source.y} L ${target.x} ${target.y}`}
                strokeWidth={isShortestLink ? '9' : '2'}
                stroke={isShortestLink ? SECOND_COLOR : MAIN_COLOR}
              />
              <path
                id={pathId}
                d={`M ${source.x} ${source.y} L ${target.x} ${target.y}`}
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
            </React.Fragment>
          );
        })}
      </g>
      <g>
        {simulationNodes.map((node) => {
          const isShortestVertex = shortestPathState.shortestPath.some((vertex) => vertex === node.value);
          return (
            <React.Fragment key={node.index}>
              <circle
                className="cursor-pointer"
                cx={node.x}
                cy={node.y}
                r={20}
                fill={isShortestVertex ? SECOND_COLOR : MAIN_COLOR}
                strokeWidth={2.5}
                stroke={MAIN_COLOR}
                key={node.index}
                onMouseEnter={(e) => {
                  if (!isShortestVertex) {
                    e.currentTarget.setAttribute('fill', SECOND_COLOR);
                  } else {
                    e.currentTarget.setAttribute('fill', MAIN_COLOR);
                  }
                }}
                onMouseOut={(e) => {
                  if (!isShortestVertex) {
                    e.currentTarget.setAttribute('fill', MAIN_COLOR);
                  } else {
                    e.currentTarget.setAttribute('fill', SECOND_COLOR);
                  }
                }}
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
                {node.value}
              </text>
            </React.Fragment>
          );
        })}
      </g>
    </svg>
  );
}
