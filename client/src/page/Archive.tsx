import { DropProvider } from "@components/Archive/DropProvider";
import { Dropzone } from "@components/Archive/Dropzone";
import { FileCard } from "@components/Archive/FileCard";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";

export function Archive({ search }: { search: string }) {
  const folders = useSelector(
    (state: RootState) => state.foldersReducer.folders
  );
  const selectedFolders = useSelector(
    (state: RootState) => state.foldersReducer.selected
  );
  const files = useSelector((state: RootState) => state.filesReducer.files);

  return (
    <DropProvider>
      <div className="grid md:grid-cols-6 gap-4">
        {search.length
          ? files
              .filter((file) => file.name.startsWith(search))
              .map((file, id) => (
                <FileCard {...file} folderId={selectedFolders} key={id} />
              ))
          : files.map((file, id) => {
              if (selectedFolders === 0)
                return (
                  <FileCard {...file} folderId={selectedFolders} key={id} />
                );
              if (file.folderId !== folders[selectedFolders].id) return <></>;
              return <FileCard {...file} folderId={selectedFolders} key={id} />;
            })}
        <Dropzone />
      </div>
    </DropProvider>
  );
}
// return <FileCard {...file} folderId={selectedFolders} key={id} />;
