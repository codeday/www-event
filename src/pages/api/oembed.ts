import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, format, maxwidth, maxheight } = req.query;
  if (format === 'xml') {
    res.setHeader('Content-Type', 'application/xml');
    res.status(501).send('Not implemented');
    return;
  }
  res.setHeader('Content-Type', 'application/json');
  return res.send({
    type: 'rich',
    version: '1.0',
    title: 'Registration Form',
    provider_name: 'CodeDay',
    provider_url: 'https://codeday.org',
    html: `<iframe src="${url}/embed" width="${Math.min(maxwidth as unknown as number || 800, 800)}px" height="${Math.min(maxheight as unknown as number || 600, 600)}px"></iframe>`,
    width: maxwidth || 800,
    height: maxheight || 600,
  })
};
