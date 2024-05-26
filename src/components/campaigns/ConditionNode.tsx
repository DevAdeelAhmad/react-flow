import { Filter, Plus } from 'lucide-react';
import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import PopoverComponent from './Popover';

interface ConditionNodeProps extends NodeProps {
    onPlusClick: () => void;
    onSelect: (type: string) => void;
}

const ConditionNode: React.FC<ConditionNodeProps> = ({ data }) => {
    return (
        <div className='p-5 text-sm border rounded-md bg-white relative'>
            <div className='flex items-center gap-4'>
                <Filter className="mr-2" />
                <span>{data.label}</span>
            </div>
            <Handle className='z-10 cursor-pointer' type="source" position={Position.Bottom} id="a">
                <PopoverComponent onSelect={data.onSelect}>
                    <div className="flex flex-col items-center justify-center w-full mt-1 -mr-4" onClick={data.onPlusClick}>
                        <div className='h-5 w-[2px] bg-muted'></div>
                        <div className='h-5 w-5 rounded-full bg-muted-foreground flex items-center justify-center'>
                            <Plus size={10} />
                        </div>
                    </div>
                </PopoverComponent>
            </Handle>
        </div>
    );
};

export default ConditionNode;
