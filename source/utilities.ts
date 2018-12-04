export function download(blob : Blob, filename : string) {
  if (navigator.msSaveBlob) {
    // Internet Explorer throws "Access is Denied" with ObjectUrls
    navigator.msSaveBlob(blob, filename);
    return;
  }
  const link = document.createElement("A") as HTMLAnchorElement;
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}