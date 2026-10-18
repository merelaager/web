import { Link, useLoaderData } from "react-router";
import type { MetaDescriptor, MetaFunction } from "react-router";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";
import { getSitemapEntries, type SitemapEntry } from "~/utils/sitemap.server";

export const meta: MetaFunction = () => {
  return genMetaData(MetaConstants.SISUKAART, "/sisukaart") as MetaDescriptor[];
};

export async function loader() {
  return { entries: await getSitemapEntries() };
}

interface TreeNode extends SitemapEntry {
  children: TreeNode[];
}

// Nest each page under its parent URL if listed.
const buildTree = (entries: SitemapEntry[]): TreeNode[] => {
  const byPath = new Map<string, TreeNode>(
    entries.map((e) => [e.path, { ...e, children: [] }])
  );
  const roots: TreeNode[] = [];
  for (const node of byPath.values()) {
    const parent = byPath.get(node.path.replace(/[^/]+\/$/, ""));
    (parent && parent.path !== "/" ? parent.children : roots).push(node);
  }
  return roots;
};

const PageList = ({ nodes }: { nodes: TreeNode[] }) => (
  <ul>
    {nodes.map((node) => (
      <li key={node.path}>
        <Link to={node.path}>{node.title}</Link>
        {node.children.length > 0 && <PageList nodes={node.children} />}
      </li>
    ))}
  </ul>
);

export default function SitemapRoute() {
  const { entries } = useLoaderData<typeof loader>();
  return (
    <main>
      <section className="c-section c-section--legal">
        <div className="o-container">
          <h3 className="c-section-heading">Sisukaart</h3>
          <PageList nodes={buildTree(entries)} />
        </div>
      </section>
    </main>
  );
}
