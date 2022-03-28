import React, { useMemo } from 'react';
import hashSum from 'hash-sum';
import { Box } from '@codeday/topo/Atom';
import * as blobs2 from 'blobs/v2';

export default function BlobImage({ src, ...props }) {
  const id = `blob-image-${hashSum(src)}`;
  const path = useMemo(() => blobs2.svgPath({
    seed: Math.random(),
    extraPoints: 10,
    randomness: 3,
    size: 1,
  }), [id]);

  return (
    <>
      <Box
        backgroundImage={`url(${src})`}
        backgroundSize="cover"
        backgroundPosition="50% 50%"
        width="100%"
        height="100%"
        style={{ clipPath: `url(#${id})` }}
        {...props}
      />
      <svg
        x={0}
        y={0}
        width={0}
        height={0}
        display="none"
      >
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d={path} />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
