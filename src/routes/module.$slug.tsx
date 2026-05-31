import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { ModulePageActions, ModulePageRenderer } from "@/components/admin/module-page-renderer";
import { getModuleTitle, modulePagesData } from "@/lib/module-pages-data";

export const Route = createFileRoute("/module/$slug")({
  head: ({ params }) => {
    const title = getModuleTitle(params.slug);
    return { meta: [{ title: `${title} · Auralis Admin` }] };
  },
  component: ModulePage,
});

function ModulePage() {
  const { slug } = Route.useParams();
  const data = modulePagesData[slug];

  if (!data) {
    throw notFound();
  }

  const title = getModuleTitle(slug);

  return (
    <AdminShell>
      <PageHeader
        title={title}
        description={data.description}
        action={<ModulePageActions />}
      />
      <ModulePageRenderer data={data} />
    </AdminShell>
  );
}
