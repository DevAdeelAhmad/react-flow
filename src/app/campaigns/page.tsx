"use client";
import AudienceProfilesNode from '@/components/campaigns/AudienceProfilesNode';
import ConditionNode from '@/components/campaigns/ConditionNode';
import EmailNode from '@/components/campaigns/EmailNode';
import FilterNode from '@/components/campaigns/FilterNode';
import LikePostNode from '@/components/campaigns/LikePostNode';
import SendInviteNode from '@/components/campaigns/SendInviteNode';
import SendMessageNode from '@/components/campaigns/SendMessageNode';
import VisitProfileNode from '@/components/campaigns/VisitProfileNode';
import WithdrawRequestNode from '@/components/campaigns/WithdrawRequestNode';
import React, { MouseEvent, useCallback, useState } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Connection,
    Controls,
    Edge,
    MiniMap,
    Node,
    NodeProps,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const nodeTypes = {
    audienceProfiles: AudienceProfilesNode as React.FC<NodeProps>,
    sendInvite: SendInviteNode,
    sendMessage: SendMessageNode,
    likePost: LikePostNode,
    withdrawRequest: WithdrawRequestNode,
    condition: ConditionNode,
    email: EmailNode,
    visitProfile: VisitProfileNode,
    filter: FilterNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'audienceProfiles',
        data: { label: 'url wilco - Blad1 (1).csv', onPlusClick: () => { }, onSelect: (type: string) => { } },
        position: { x: 250, y: 0 },
        deletable: false,
    },
];

const initialEdges: Edge[] = [
    {
        id: 'e1-2',
        source: '1',
        target: '1',
        deletable: false,
        type: 'default',
        animated: true,
    },
];

const CampaignsPage: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
    const [popoverPosition, setPopoverPosition] = useState<{ x: number, y: number } | null>(null);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        [setEdges]
    );

    const addNode = useCallback(
        (type: string) => {
            const newNode: Node = {
                id: `${nodes.length + 1}`,
                type: type.toLowerCase().replace(/ /g, ''),
                data: {
                    label: type,
                    onPlusClick: () => { },
                    onSelect: (nodeType: string) => addNode(nodeType),
                },
                position: { x: 250, y: nodes.length * 100 + 50 },
            };
            setNodes((nds) => nds.map((node) =>
                node.id === '1' ? { ...node, data: { ...node.data, onPlusClick: undefined, onSelect: undefined } } : node
            ).concat(newNode));
            setEdges((eds) => eds.concat({ id: `e${nodes.length + 1}-1`, source: '1', target: `${nodes.length + 1}`, animated: true }));
            setSelectedEdge(null);
            setPopoverPosition(null);
        },
        [nodes, selectedEdge, setNodes, setEdges]
    );

    const onEdgeClick = (event: MouseEvent<Element, MouseEvent>, edge: Edge) => {
        event.preventDefault();
        setSelectedEdge(edge.id);
        const { clientX: x, clientY: y } = event;
        setPopoverPosition({ x, y });
    };

    const onPlusClick = () => {
        const startingNode = document.querySelector('#reactflow-wrapper')?.getBoundingClientRect();
        const plusButton = document.querySelector('#reactflow-wrapper .react-flow__node')?.getBoundingClientRect();

        if (startingNode && plusButton) {
            setPopoverPosition({
                x: startingNode.left + plusButton.left + plusButton.width / 2,
                y: startingNode.top + plusButton.top + plusButton.height,
            });
        }
    };

    return (
        <div id="reactflow-wrapper" style={{ height: '100vh', width: '100%' }}>
            <ReactFlow
                nodes={nodes.map(node => node.id === '1' ? { ...node, data: { ...node.data, onPlusClick, onSelect: addNode } } : node)}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodeTypes={nodeTypes}
                onEdgeClick={onEdgeClick}
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};

export default CampaignsPage;
