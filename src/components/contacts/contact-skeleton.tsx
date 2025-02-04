export const Skeleton = () => {
  return (
    <div className='animate-pulse space-y-4 w-full block'>
      <div className='h-4 bg-gray-300 rounded w-3/4'></div>
      <div className='h-4 bg-gray-300 rounded w-1/2'></div>
      <div className='h-4 bg-gray-300 rounded w-full'></div>
      <div className='h-4 bg-gray-300 rounded w-5/6'></div>
    </div>
  );
};
