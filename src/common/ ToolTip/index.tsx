import { ReactNode, useState } from 'react';

interface TooltipType {
  text: string;
  children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipType) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <p className="bg-black p-2 text-white text-xs absolute z-10 -top-7 rounded-lg -right-9">
          {text}
        </p>
      )}
    </div>
  );
};

export default Tooltip;
