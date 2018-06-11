export function download(blob, filename) {
  if (navigator.msSaveBlob) {
    // Internet Explorer throws "Access is Denied" with ObjectUrls
    navigator.msSaveBlob(blob, filename);
    return;
  }
  const link = document.createElement("A");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function noOp(v) { return v; }

export function merge(target, source) {
  if (typeof(Object.assign) === "function") {
    Object.assign(target, source);
  }
  else if (source != null) {
    for (let key in source) {
      target[key] = source[key];
    }
  }
}