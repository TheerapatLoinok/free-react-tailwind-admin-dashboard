import { ReactNode, useState } from 'react';

interface TooltipType {
  text: string;
  children: ReactNode;
  className?: string;
}

const Tooltip = ({ text, children, className }: TooltipType) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <p
          className={`${className ? className : 'bg-black p-2 text-white text-xs absolute z-10 rounded-lg top-0 -mt-7 ml-15'}`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default Tooltip;
