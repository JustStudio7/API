/*

MIT License

Copyright (c) 2024 JustStudio. <https://juststudio.is-a.dev/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


*/

// STARTUP + INITIALIZATION

import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
const app = await new Hono();

const docsPage = `<html><head><script>window.location.href = \'https://juststudio.is-a.dev/api/\'</script></head><body></body></html>`
const docsHTML = '<html><head><script>fetch("https://juststudio.is-a.dev/api/").then(response => response.text()).then(data => { document.open(); document.write(data); document.close(); }).catch(() => { window.location.href = "https://juststudio.is-a.dev/api/"; });</script></head><body></body></html>';

// API URLs
const url1 = 'https://api.juststudio.is-a.dev/'
const url2 = 'https://juststudio-api.deno.dev/'

// ENDPOITNS
const ep1 = 'v1/terms'
const ep2 = 'v1/status'
const docs = 'docs'
const docs0= 'index.html'

// SERVER 

// MAIN
app.get(url1+docs, (c) => c.redirect("https://juststudio.is-a.dev/api/"));
app.get(url2+docs, (c) => c.redirect("https://juststudio.is-a.dev/api/"));
Deno.serve(async (req: Request) => {
    let resp = '';
    let code = 200;
    let output: object;
    let obj;
    if (req.url === url1 || req.url === url2 || req.url === url1+'v1' || req.url === url2+'v1' || req.url === url1+'v1/' || req.url === url2+'v1/') {
        resp = "JustStudio.API\nStatus code: 200 \"OK\"\n\nWEB: https://juststudio.is-a.dev/\nAPI: https://api.juststudio.is-a.dev/\nDOCS: https://juststudio.is-a.dev/api/";
    } else if (req.method === 'GET' && ( req.url === url1+ep1 || req.url === url2+ep1)) {
        resp = "a";
    } else if (req.method === 'GET' && ( req.url === url1+ep2 || req.url === url2+ep2)) {
        obj = {
            'code': code,
        };
        output = JSON.stringify(obj);
        resp = output;
    }
    
    else if ( req.url == url1+docs || req.url == url2+docs || req.url == url1+docs+'/' || req.url == url2+docs+'/' ) {
        resp = new TextEncoder().encode(docsHTML);
        code = 200
    } else if ( req.url == url1+docs0 || req.url == url2+docs0 || req.url == url1+docs0+'/' || req.url == url2+docs0+'/' ) {
        resp = new TextEncoder().encode(docsPage);
        code = 200
    } else {
        resp = "JustStudio.API\nStatus code: 404 \"NOT FOUND\"";
        code = 404;
    };
    return new Response( resp, { status: code } );
});


/*
---
example:
Deno.serve((req: Request) => new Response("JustStudio.API\nStatus code: 200 \"OK\"\n\nWEB: https://juststudio.is-a.dev/\nAPI: https://api.juststudio.is-a.dev/"));
---
*/
