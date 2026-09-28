import { start, toast, type ToastOptions } from 'liquid-glass-kit';
import { Switch, DatePicker, type DatePickerProps } from 'liquid-glass-kit/react';

start();
const t: ToastOptions = { title: 'Saved' };
toast(t);
const props: DatePickerProps = { placeholder: 'Pick' };
export const components = [Switch, DatePicker, props] as const;
