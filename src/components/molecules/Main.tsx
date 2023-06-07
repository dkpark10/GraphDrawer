/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { SimulationNodeDatum } from 'd3-force';
import type { Selection, BaseType } from 'd3-selection';
import type { D3DragEvent } from 'd3-drag';
import { shallow } from 'zustand/shallow';
import { useGraphStore } from '@/store/graph';
import { Vertex, AttrType } from '@/types/graph';
import { useArrowStore, useShortestPathStore } from '@/store';
import { MAIN_COLOR, SECOND_COLOR } from '@/constants';

type DragEvent = D3DragEvent<Element, SimulationNodeDatum, SimulationNodeDatum>;

const arrowMarkId = 'arrow';
const WIDTH = 600;
const HEIGHT = 600;

/**
 * @description 해당 엣지가 최단경로 루트인지 확인하는 함수
 * 최단경로는 역순으로 정점 스트링 배열이 주어지므로 소스와 타켓의 인덱스 차이를 계산하여 1이하 이면 최단경로 판별
 */
const isShortestPath = (source: string, target: string, shortestPathList: Array<string>) => {
  if (shortestPathList.length <= 0) {
    return false;
  }
  const sourceIndex = shortestPathList.findIndex((ele) => ele === source);
  const targetIndex = shortestPathList.findIndex((ele) => ele === target);

  return (
    Math.abs(sourceIndex - targetIndex) <= 1 &&
    shortestPathList.some((ele) => ele === source) &&
    shortestPathList.some((ele) => ele === target)
  );
};

/** @todo 선언형으로 바꿔보자.. */
export default function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const { nodes, links } = useGraphStore((state) => state, shallow);

  const isArrow = useArrowStore((state) => state.isArrow);

  const shortestPathState = useShortestPathStore(({ from, to, shortestPath }) => ({ from, to, shortestPath }), shallow);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    if (svgRef.current) {
      d3.selectAll('svg > *').remove();
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

    const svg = d3.select(svgRef.current);
    svg
      .append('defs')
      .append('marker')
      .attr('id', arrowMarkId)
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 23)
      .attr('refY', 5)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto-start-reverse');

    const marker = d3.select(`#${arrowMarkId}`);
    marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z').attr('fill', MAIN_COLOR);

    const link = svg
      .append('g')
      .attr('stroke-opacity', 0.8)
      .attr('stroke-linecap', 'round')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('id', (_, i) => `edge-path-${i}`)
      .attr('stroke-width', 2)
      .attr('stroke', (l) => {
        const { source, target } = l;
        return isShortestPath((source as Vertex).value, (target as Vertex).value, shortestPathState.shortestPath)
          ? SECOND_COLOR
          : MAIN_COLOR;
      })
      .attr('marker-end', isArrow ? `url(#${arrowMarkId})` : '');

    const costText = svg
      .append('g')
      .attr('class', 'pointer-events-none')
      .attr('fill', MAIN_COLOR)
      .attr('fontSize', 14)
      .selectAll('.cost-text')
      .data(links)
      .join('text')
      .attr('textAnchor', 'middle')
      .attr('dy', -4)
      .attr('dx', 60)
      .attr('id', (_, i) => `edge-path-${i}`);

    costText
      .append('textPath')
      .attr('xlink:href', (_, i) => `#edge-path-${i}`)
      .style('pointer-events', 'none')
      .text(({ cost }) => cost || '');

    const node = svg
      .append('g')
      .attr('class', 'cursor-pointer')
      .attr('stroke', MAIN_COLOR)
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 2.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 20)
      .on('mouseenter', function hover() {
        d3.select(this).attr('fill', SECOND_COLOR);
      })
      .on('mouseleave', function hover() {
        d3.select(this).attr('fill', (d) => {
          return shortestPathState.shortestPath.some((vertex) => vertex === (d as Vertex).value)
            ? SECOND_COLOR
            : MAIN_COLOR;
        });
      })
      .attr('fill', (d) => {
        return shortestPathState.shortestPath.some((vertex) => vertex === d.value) ? SECOND_COLOR : MAIN_COLOR;
      })
      .call(
        d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded) as (
          selection: Selection<BaseType | SVGCircleElement, Vertex & SimulationNodeDatum, SVGGElement, unknown>,
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
      .attr('text-anchor', 'middle')
      .attr('dy', 6)
      .text((d) => d.value);

    const simulation = d3
      .forceSimulation(nodes as Array<SimulationNodeDatum & Vertex>)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: SimulationNodeDatum) => (d as Vertex).value)
          .distance(140),
      )
      .force('charge', d3.forceManyBody().strength(-240))
      .force('x', d3.forceX(WIDTH / 2))
      .force('y', d3.forceY(HEIGHT / 2))
      .on('tick', () => {
        link.attr(
          'd',
          (d: AttrType) =>
            `M ${d.source.x as number} ${d.source.y as number} L ${d.target.x as number} ${d.target.y as number}`,
        );

        node.attr('cx', (d: AttrType) => d.x as number).attr('cy', (d: AttrType) => d.y as number);
        text.attr('x', (d: AttrType) => d.x as number).attr('y', (d: AttrType) => d.y as number);
      });
  }, [nodes, links, isArrow, shortestPathState]);

  return <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} ref={svgRef} />;
}
