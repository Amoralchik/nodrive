import { Breadcrumb } from "flowbite-react";

export function BreadcrumbLayout() {
  return (
    <Breadcrumb aria-label="Default breadcrumb example">
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/archive">Archive</Breadcrumb.Item>
      <Breadcrumb.Item>Recently open</Breadcrumb.Item>
    </Breadcrumb>
  );
}
