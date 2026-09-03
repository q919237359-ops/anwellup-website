import { renderToString } from "react-dom/server";
import App, { getPageMeta } from "./App";

export function render(pathname: string) {
  return renderToString(<App pathname={pathname} />);
}

export { getPageMeta };

