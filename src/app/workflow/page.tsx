"use client"
import PaymentInit from "@/components/PaymentInit";
import { initialEdges, initialNodes } from "@/components/Workflow.constants";
import { useCallback } from "react";
import ReactFlow, { addEdge, Background, Connection, Controls, Edge, MiniMap, Node, useEdgesState, useNodesState } from "reactflow";

export default function Home() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const nodeTypes = {
        'paymentInit': PaymentInit
    }
    const onConnect = useCallback((connection: Connection) => {
        const edge = { ...connection, animated: true, id: `${edges.length} + 1` }
        setEdges(prevEdges => addEdge(edge, prevEdges))
    }, [])
    return (
        <main className="min-h-screen h-screen max-h-screen w-full flex items-center justify-center p-10 cursor-default">
            <section className="max-w-screen-xl w-full h-full border">
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes} edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                >
                    <Background />
                    <Controls />
                    {/* <MiniMap /> */}
                </ReactFlow>
            </section>
        </main>
    );
}
