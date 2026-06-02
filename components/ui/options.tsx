import React from 'react';
import { RxFace } from 'react-icons/rx';

interface SVGLoaderProps {
  width: string | number;
  height: string | number;
  color: string;
}

export const SVGLoader: React.FC<SVGLoaderProps> = ({ width, height, color }) => {
  return (
    <svg
      version="1.1"
      id="loader-1"
      xmlns="http://www.w3.org/2000/svg"
      x="10px"
      y="30px"
      width={width}
      height={height}
      viewBox="0 0 40 40"
      enableBackground="new 0 0 80 80">
      <path
        opacity="0.2"
        fill={color}
        d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
      />
      <path
        fill={color}
        d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

// NoRecordFound Component
export const NoRecordFound = ({ colSpan, text = "No record found", asTable = true }: { colSpan?: number; text?: string; asTable?: boolean }) => {
  const content = (
    <div className="flex flex-col justify-center items-center h-full gap-2">
      <RxFace className="w-12 h-12 text-gray-400 dark:text-gray-500" />
      <p className="text-sm text-gray-500 dark:text-gray-450 font-medium">
        {text}
      </p>
    </div>
  );

  if (!asTable) {
    return <div className="h-[250px] flex items-center justify-center">{content}</div>;
  }

  return (
    <tr>
      <td colSpan={colSpan} className="h-[250px] border-none text-center align-middle">
        <div className="flex justify-center items-center h-full w-full">
          {content}
        </div>
      </td>
    </tr>
  );
};

// SVGLoaderFetch Component
export const SVGLoaderFetch = ({ colSpan, text, asTable = true }: { colSpan?: number; text: string; asTable?: boolean }) => {
  const content = (
    <div className="flex flex-col justify-center items-center h-full gap-2">
      <SVGLoader width={"36px"} height={"36px"} color={"#27A376"} />
      <p className="text-xs text-gray-500 dark:text-gray-450 font-medium">{text}</p>
    </div>
  );

  if (!asTable) {
    return <div className="h-[250px] flex items-center justify-center">{content}</div>;
  }

  return (
    <tr>
      <td colSpan={colSpan} className="h-[250px] border-none text-center align-middle">
        <div className="flex justify-center items-center h-full w-full">
          {content}
        </div>
      </td>
    </tr>
  );
};
