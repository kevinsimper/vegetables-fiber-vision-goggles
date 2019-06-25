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

function readMyBlob(blob) {
  const reader = new FileReader();
  reader.onload = function () {
    const result = event.target.result
    post(result)
  }
  reader.readAsArrayBuffer(blob)
}

function drawCanvas(img) {
  let ctx = mycanvas.getContext("2d");
  mycanvas.width = 500
  mycanvas.height = 500
  ctx.drawImage(img, 0, 0, 500, 500);
  const resized = mycanvas.toBlob((blob) => {
    readMyBlob(blob)
  }, "image/png")
}

function analyze() {
  const reader = new FileReader();
  reader.onload = function(event) {
    const result = event.target.result;
    let img = document.createElement("img");
    img.onload = function () {
      drawCanvas(img)
    }
    img.src = result
  };
  reader.readAsDataURL(image.files[0]);

}
window.analyze = analyze;
