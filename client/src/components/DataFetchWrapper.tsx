import { ReactNode } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

interface DataFetchWrapperProps<TData, TError> {
  query: UseQueryResult<TData, TError>;
  children: (data: TData) => ReactNode;
  loadingComponent?: ReactNode;
  errorComponent?: (error: TError | Error | null) => ReactNode;
  emptyComponent?: ReactNode;
  isEmpty?: (data: TData) => boolean;
}

/**
 * A wrapper component for data fetching that handles loading, error, and empty states
 */
export function DataFetchWrapper<TData, TError>({
  query,
  children,
  loadingComponent,
  errorComponent,
  emptyComponent,
  isEmpty = (data) => {
    // Default empty check for arrays and objects
    if (Array.isArray(data)) return data.length === 0;
    if (data && typeof data === 'object') return Object.keys(data).length === 0;
    return !data;
  }
}: DataFetchWrapperProps<TData, TError>) {
  const { isLoading, isError, data, error } = query;

  // Loading state
  if (isLoading) {
    return (
      <>
        {loadingComponent || (
          <div className="flex items-center justify-center p-8">
            <div className="w-12 h-12 border-4 border-t-custom-accent3 border-custom-primary-lighter rounded-full animate-spin"></div>
          </div>
        )}
      </>
    );
  }

  // Error state
  if (isError) {
    return (
      <>
        {errorComponent ? 
          errorComponent(error as TError) : (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-800 dark:text-red-300">
            <h3 className="text-lg font-medium">Error loading data</h3>
            <p className="mt-1">{(error as Error)?.message || 'An unknown error occurred'}</p>
          </div>
        )}
      </>
    );
  }

  // Empty state
  if (data && isEmpty(data)) {
    return (
      <>
        {emptyComponent || (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-gray-600 dark:text-gray-300">
            <p className="text-center">No data available</p>
          </div>
        )}
      </>
    );
  }

  // Success with data
  return <>{children(data as TData)}</>;
}

/**
 * A higher-order component that adds loading, error, and empty states to a component
 */
export function withDataFetch<TProps extends { data: TData }, TData, TError>(
  Component: React.ComponentType<TProps>,
  options: {
    loadingComponent?: ReactNode;
    errorComponent?: (error: TError | Error | null) => ReactNode;
    emptyComponent?: ReactNode;
    isEmpty?: (data: TData) => boolean;
  } = {}
) {
  return function WithDataFetch(
    props: Omit<TProps, 'data'> & { query: UseQueryResult<TData, TError> }
  ) {
    const { query, ...rest } = props;
    
    return (
      <DataFetchWrapper
        query={query}
        loadingComponent={options.loadingComponent}
        errorComponent={options.errorComponent}
        emptyComponent={options.emptyComponent}
        isEmpty={options.isEmpty}
      >
        {(data) => <Component {...(rest as any)} data={data} />}
      </DataFetchWrapper>
    );
  };
}
