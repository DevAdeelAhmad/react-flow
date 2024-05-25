"use client"
import { useCallback } from "react";
import ReactFlow, { addEdge, Background, Connection, Controls, Edge, MiniMap, Node, useEdgesState, useNodesState } from "reactflow";

const initialNodes: Node[] = [
  {
    id: '1',
    data: {
      label: "Node 1"
    },
    position: { x: 0, y: 0 }
  },
  {
    id: '2',
    data: {
      label: "Node 2"
    },
    position: { x: 200, y: 0 }
  },
  {
    id: '3',
    data: {
      label: "Node 3"
    },
    position: { x: 400, y: 0 }
  },
]
const initialEdges: Edge[] = [
  {
    id: '1-2', source: '1', target: '2', animated: true
  }
]
export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((connection: Connection) => {
    const edge = { ...connection, animated: true, id: `${edges.length} + 1` }
    setEdges(prevEdges => addEdge(edge, prevEdges))
  }, [])
  return (
    <main className="min-h-screen h-screen max-h-screen w-full flex items-center justify-center p-10 cursor-default">
      <section className="max-w-screen-xl w-full h-full border">
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </section>
    </main>
  );
}
