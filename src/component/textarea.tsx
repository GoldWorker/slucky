import React, { Component, ChangeEvent } from 'react';

interface TextareaProps {
    rows: number,
    cols: number,
    onChange: (value: string) => void
}

export default function Textarea(props: TextareaProps): JSX.Element {
    const id = Math.random().toString(36).substring(2);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = e.target;
        props.onChange && props.onChange(value);
    };

    return (
        <textarea id={id} cols={props.cols || 50} rows={props.rows || 6} className="textarea" onChange={handleChange}></textarea>
    );
}
