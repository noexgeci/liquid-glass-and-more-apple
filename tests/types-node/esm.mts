import { start, alert, select, type AlertOptions } from 'liquid-glass-kit';
import { Button, Calendar, type CalendarProps } from 'liquid-glass-kit/react';
import 'liquid-glass-kit/auto';

start({ refraction: 'auto' });
const opts: AlertOptions = { title: 'Hi' };
void alert(opts);
select('#cal', '2026-01-01');
const props: CalendarProps = { value: '2026-01-01', onValueChange: (v: string) => v.length };
export const components = [Button, Calendar, props] as const;
