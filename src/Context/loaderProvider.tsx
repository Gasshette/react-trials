import React from 'react';

interface ILoaderContext {
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    withLoader: Function
}

const LoaderContext = React.createContext<any>({ isLoading: false });

const LoaderProvider: React.FC = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const withLoader = async (func: Function) => {
        setIsLoading(true);
        await func();
        setIsLoading(false);
    }

    return <LoaderContext.Provider value={{ isLoading, setIsLoading, withLoader }}>{children}</LoaderContext.Provider>
}

export const useLoaderContext = () => React.useContext<ILoaderContext>(LoaderContext);

export default LoaderProvider;