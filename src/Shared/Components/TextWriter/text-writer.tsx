import React from 'react';
import './text-writer.scss';
import DOMPurify from 'dompurify';

interface ITextWriterState {
    writtenText: string,
    index: number;
}

const TextWriter = ({ text, speed }: { text: string, speed: number }) => {
    const initialState = { writtenText: '', index: 0 };
    const sanitizer = DOMPurify.sanitize;

    const [state, setState] = React.useState<ITextWriterState>(initialState);

    React.useEffect(() => {
        if (state.index < text.length - 1) {
            const animKey = setInterval(() => {
                setState(state => {
                    if (state.index >= text.length - 1) {
                        clearInterval(animKey);
                        return { ...state };
                    }
                    return { ...state, index: state.index + 1 };
                });
            }, speed);

            return () => clearInterval(animKey);
        }
    });

    React.useEffect(() => {
        setState(state => ({ ...state, writtenText: state.writtenText + text[state.index] }))
    }, [state.index]);

    // Reset the state when the text is changed (Language change)
    React.useEffect(() => {
        if (text.length > 0) {
            setState(initialState);
        }
    }, [text])

    return <div className="text-writer-component"><span className="text" dangerouslySetInnerHTML={{ __html: sanitizer(state.writtenText) }} /></div>
}

export default TextWriter;