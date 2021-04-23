import React from "react";

export interface IInput extends React.HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  validate?: (value: string) => boolean;
  options?: string[];
  optionObjects?: any[];
  optionKeys?: string[];
  optionIdKey?: string;
  messageOnError?: string;
};
