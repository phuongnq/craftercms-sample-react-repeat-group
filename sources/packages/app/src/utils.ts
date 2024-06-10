export function isAuthoring() {
  const html = document.documentElement;
  const attr = html.getAttribute('data-is-authoring');
  return (
    attr === '${modePreview?c}' || // Otherwise disable/enable if you want to see pencils in dev server.
    attr === 'true'
  );
}
