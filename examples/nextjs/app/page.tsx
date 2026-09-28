// A Server Component: the kit's React components are client components
// already ('use client' is part of the build), so they can be used here.
import { Glass, Button, Icon } from 'liquid-glass-kit/react';
import Controls from './controls';

export default function Page() {
  return (
    <main>
      <h1>Liquid Glass in Next.js</h1>
      <Glass className="panel">
        <div className="row">
          <Button variant="prominent" icon={<Icon name="sparkles" />}>
            Get started
          </Button>
          <Button icon={<Icon name="share" />} aria-label="Share" />
        </div>
      </Glass>
      <Controls />
    </main>
  );
}
