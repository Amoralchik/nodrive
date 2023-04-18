import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { Breadcrumbs, Anchor } from "@mantine/core";

export function BreadcrumbLayout() {
  const folders = useSelector(
    (state: RootState) => state.foldersReducer.folders
  );
  const selectedFolders = useSelector(
    (state: RootState) => state.foldersReducer.selected
  );
  const folderName = folders[selectedFolders]?.name;

  return (
    <Breadcrumbs mt="xs">
      <Anchor href="/archive">Archive</Anchor>
      <Anchor href={`/archive/${folderName}`}>{folderName}</Anchor>
    </Breadcrumbs>
  );
}
