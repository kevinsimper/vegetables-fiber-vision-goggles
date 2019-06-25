import 'https://unpkg.com/buffer-es';

async function post(result) {
  const body = JSON.stringify({
    file: Buffer.from(result)
  });
  const req = await fetch(
    `http://localhost:9000/checkfilejson`,
    {
      method: "POST",
      mode: 'cors',
      body,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const data = await req.json()
  document.querySelector('#result').innerText = JSON.stringify(data, null, 2)
  return data
}

function analyze() {
  const reader = new FileReader();
  reader.onload = function(event) {
    const result = event.target.result;
    post(result)
  };
  reader.readAsArrayBuffer(image.files[0]);

}
window.analyze = analyze;
