import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
export default function NotFound() { return <main id="main-content" className="not-found-page"><span className="eyebrow">404 / reference not found</span><h1>This route is outside<br/><em>the current range.</em></h1><p>The product or page may have moved. Return to the seven-category index and continue from a verified route.</p><Link className="button button-orange" href="/products/"><ArrowLeft size={18}/> Back to product range</Link></main>; }
