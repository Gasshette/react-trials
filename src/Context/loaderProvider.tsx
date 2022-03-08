import React from 'react';

interface ILoaderContext {
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoaderContext = React.createContext<any>({ isLoading: false });

const LoaderProvider: React.FC = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    return <LoaderContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoaderContext.Provider>
}

export const useLoaderContext = () => React.useContext<ILoaderContext>(LoaderContext);

export default LoaderProvider;