import { CATALOG_FILE } from '@/lib/catalog-token';

// Serves the catalog inside a light wrapper that beacons an "opened" event
// only after a few seconds of real viewing. Email security scanners fetch the
// URL but don't run JS or linger, so they never trigger the beacon.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const t = JSON.stringify(token);

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Bernardo Urbina Design — Trade Collection</title>
<style>html,body{margin:0;height:100%;background:#0F0E0C}iframe{border:0;width:100%;height:100vh;display:block}</style>
</head>
<body>
<iframe src="${CATALOG_FILE}" title="Bernardo Urbina Design — Trade Collection"></iframe>
<script>
(function(){
  var t=${t};
  try{ if(sessionStorage.getItem('bud_opened'))return; }catch(e){}
  setTimeout(function(){
    try{ sessionStorage.setItem('bud_opened','1'); }catch(e){}
    try{
      fetch('/api/track',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({t:t}),keepalive:true}).catch(function(){});
    }catch(e){}
  },3000);
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}
