const { sign } = require('jsonwebtoken')
// import getConfig from 'next/config';
// import { sign } from 'jsonwebtoken';

console.log(sign(
  { tid: 'ckvk6dow283970iqjljv3n7ii' },
  'Z00Og2Wywq0G7D5LrT5jau21SQc_pNMePZHNafNi68NlbmhIezVCZ3QvKxSuMDqfMmyZWMoo7SyS-kdf3-yN8Sl45r5KaqUlm-dVc_blgdnN4-zVzox7C8cE-z0MXjI7Ifo5vzzKgZFLrybtnKjc3gaz3PwJWENtgziJbZCF-Ng',
  { audience: 'www-event', expiresIn: '1y' },
))
