# www-event

Displays details about CodeDay events, and allows registration for them.

Contains certain icons from [twemoji](https://twemoji.twitter.com/)

## Embedding Registration Form

If you want to create your own landing page, you can embed the CodeDay registration page using the React component below:

```js
import { useState, useCallback, useEffect, useRef } from 'react';

const CODEDAY_ORIGIN = 'https://event.codeday.org';

// USAGE: <CodeDayRegistrationForm language="en-US" webname="seattle" />
export default function CodeDayRegistrationForm({ language, webname }) {
  const ref = useRef();
  const [height, setHeight] = useState(400);
  
  // Validate that the message came from CodeDay
  const onResizeMessageHandler = useCallback((e) => {
    if (e.origin !== CODEDAY_ORIGIN) return;
    const {type, height} = JSON.parse(e.data);
    if (type !== 'embedResize') return;
    setHeight(height);
  }, [ref, setHeight]);

  // When we receive a new size, update the state size.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('message', onResizeMessageHandler);
    return () => window.removeEventListener('message', onResizeMessageHandler);
  }, [typeof window]);

  // When this component first loads, request the size.
  useEffect(() => {
    if (!ref?.current?.contentWindow || typeof window === 'undefined') return;
    ref.current.contentWindow.postMessage('poll');
    ref.current.addEventListener('load', ref.current.contentWindow.postMessage('poll'));
  }, [typeof window, ref]);

  return (
    <iframe
      width="100%"
      height={height}
      ref={ref}
      src={`${CODEDAY_ORIGIN}/${language || 'en-US'}/${webname}/embed`}
    />
  );
}
```