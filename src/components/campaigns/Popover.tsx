import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Filter, Mail, MessageSquare, SlidersVertical, ThumbsUp, User, UserPlus, UserX } from 'lucide-react';
import React, { ReactNode } from 'react';

type PopoverComponentProps = {
    onSelect: (type: string) => void;
    children: ReactNode
};

const PopoverComponent: React.FC<PopoverComponentProps> = ({ onSelect, children }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className='w-[200px]'>
                <div className="flex flex-col space-y-2 items-start justify-start w-full">
                    <Button variant="ghost" onClick={() => onSelect('Visit profile')}>
                        <User className="mr-2" /> Visit profile
                    </Button>
                    <Button variant="ghost" onClick={() => onSelect('Send an invite')}>
                        <UserPlus className="mr-2" /> Send an invite
                    </Button>
                    <Button variant="ghost" onClick={() => onSelect('Send a message')}>
                        <MessageSquare className="mr-2" /> Send a message
                    </Button>
                    <Button variant="ghost" onClick={() => onSelect('Like recent post')}>
                        <ThumbsUp className="mr-2" /> Like recent post
                    </Button>
                    <Button variant="ghost" onClick={() => onSelect('Withdraw request')}>
                        <UserX className="mr-2" /> Withdraw request
                    </Button>
                    <Button variant="ghost" onClick={() => onSelect('Condition')}>
                        <Filter className="mr-2" /> Condition
                    </Button>
                    <Button variant="ghost" onClick={() => onSelect('Email')}>
                        <Mail className="mr-2" /> Email
                    </Button>
                    <Button variant="ghost" onClick={() => onSelect('Filter')}>
                        <SlidersVertical className="mr-2" /> Filter
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverComponent;
