import { Edge, Node } from "reactflow";

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { ammount: 10 },
    type: "paymentInit",
  },
];
