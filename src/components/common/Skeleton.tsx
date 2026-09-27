import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = 'w-full',
  height = 'h-5',
  borderRadius = 'rounded-xl',
}) => {
  return (
    <div
      className={`shimmer ${width} ${height} ${borderRadius} ${className}`}
      aria-hidden="true"
    />
  );
};
