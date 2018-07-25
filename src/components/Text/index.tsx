import * as React from 'react';

interface ITextProps {
  children: any
}

export default function Text({ children }: ITextProps) {
  return (<span>{children}</span>)
}