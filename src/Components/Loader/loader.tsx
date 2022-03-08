import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="w-1/6"></div>
            <div className="w-5/6 relative h-full flex justify-center items-center">
                <div className="absolute inset-0 bg-slate-100 opacity-50 -z-50"></div>
                <div className="h-24 w-24 rounded-full bg-blue-500">
                    <div className="h-24 w-24 rounded-full bg-blue-500 animate-ping" />
                </div>
            </div>
        </div>
    );
}

export default Loader;
