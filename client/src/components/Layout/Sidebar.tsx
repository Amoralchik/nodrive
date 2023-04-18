import { FolderModal } from "@components/extra/FolderModal";
import { Box, Divider, NavLink } from "@mantine/core";
import { RootState } from "@store/index";
import {
  createFolder,
  deleteFolder,
  openFolder,
  updateFolder,
} from "@store/slices/folders";
import { useDispatch, useSelector } from "react-redux";

export function LayoutSidebar() {
  const folders = useSelector(
    (state: RootState) => state.foldersReducer.folders
  );
  const selected = useSelector(
    (state: RootState) => state.foldersReducer.selected
  );
  const dispatch = useDispatch();

  const onCreate = async (
    name: string,
    close: () => void,
    setName: (arg0: string) => void
  ) => {
    createFolder(dispatch, name);
    close();
    setName("");
  };
  const onUpdate = async (
    name: string,
    close: () => void,
    setName: (arg0: string) => void
  ) => {
    updateFolder(dispatch, name, folders[selected]?.id);
    close();
    setName("");
  };
  const onDelete = async (
    name: string,
    close: () => void,
    setName: (arg0: string) => void
  ) => {
    if (name !== folders[selected]?.name) return;
    deleteFolder(dispatch, folders[selected].id);
    close();
    setName("");
  };
  return (
    <Box w={220}>
      {!!folders.length &&
        folders.map(({ name }, index) => (
          <NavLink
            key={name}
            active={index === selected}
            label={name}
            onClick={() => dispatch(openFolder({ id: index }))}
            variant="filled"
          />
        ))}
      <Divider my="sm" />
      <FolderModal
        onConfirm={onCreate}
        title="Enter name of our new folder"
        label="Create new Folder"
        infoText="Please write name fro new folder"
      />
      <FolderModal
        onConfirm={onUpdate}
        title="Enter new name of our folder"
        label="Edit Folder"
        infoText={`Please write new folder name for "${folders[selected]?.name}"`}
      />
      <Divider my="sm" />
      <FolderModal
        onConfirm={onDelete}
        title="Are you sure you want to delete this folder?"
        label="Delete Folder"
        color="red"
        infoText={`Please write "${folders[selected]?.name}" for delete this folder`}
      />
    </Box>
  );
}
