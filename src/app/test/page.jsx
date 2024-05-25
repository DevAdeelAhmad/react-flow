"use client"
import React, { useCallback } from 'react';
import ReactFlow, { addEdge, Controls, Handle, MiniMap, Position, useEdgesState, useNodesState } from 'reactflow';

import 'reactflow/dist/base.css';

const nodeTypes = {
    custom: CustomNode,
};

const initNodes = [
    {
        id: '1',
        type: 'custom',
        data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
        position: { x: 0, y: 50 },
    },
    {
        id: '2',
        type: 'custom',
        data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },

        position: { x: -200, y: 200 },
    },
    {
        id: '3',
        type: 'custom',
        data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
        position: { x: 200, y: 200 },
    },
];

const initEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
    },
    {
        id: 'e1-3',
        source: '1',
        target: '3',
    },
];

const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    return (
        <main className="min-h-screen h-screen max-h-screen w-full flex items-center justify-center p-10 cursor-default">
            <section className="max-w-screen-xl w-full h-full border">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    className="bg-teal-50"
                >
                    <MiniMap />
                    <Controls />
                </ReactFlow>
            </section>
        </main>
    );
};

export default Flow;

function CustomNode({ data }) {
    return (
        <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
            <div className="flex">
                <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
                    {data.emoji}
                </div>
                <div className="ml-2">
                    <div className="text-lg font-bold">{data.name}</div>
                    <div className="text-gray-500">{data.job}</div>
                </div>
            </div>

            <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
            <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
        </div>
    );
}
