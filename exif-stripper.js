/**
 * Filebrr Client-Side EXIF Metadata Stripper
 * Cleans image metadata completely offline using HTML5 Canvas.
 * Live Web App: https://www.filebrr.com/p/remove-exif-metadata.html
 */

function stripMetadata(imageFile, callback) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const outFormat = imageFile.type === "image/png" ? "image/png" : "image/jpeg";
      canvas.toBlob(function (blob) {
        callback(blob);
      }, outFormat, 0.95);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(imageFile);
}
