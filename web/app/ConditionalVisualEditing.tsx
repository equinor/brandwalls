'use client';

import dynamic from 'next/dynamic';
import { useIsPresentationTool } from 'next-sanity/hooks';

const VisualEditing = dynamic(() =>
  import('next-sanity/visual-editing').then((mod) => mod.VisualEditing),
);

export function ConditionalVisualEditing() {
  const isInsidePresentationTool = useIsPresentationTool();

  return isInsidePresentationTool ? <VisualEditing /> : null;
}
