import { BreadcrumbLayout } from "@components/Layout/Breadcrumb";
import { Footer } from "@components/Layout/Footer";
import { HeaderSearch } from "@components/Layout/Header";
import { LayoutSidebar } from "@components/Layout/Sidebar";
import { Container, Divider } from "@mantine/core";
import { RootState } from "@store/index";
import { asyncLoadFiles } from "@store/slices/files";
import { asyncLoadFolders } from "@store/slices/folders";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Archive } from "../page/Archive";

export function ArchiveLayout() {
  const folders = useSelector(
    (state: RootState) => state.foldersReducer.folders
  );
  const selectedFolders = useSelector(
    (state: RootState) => state.foldersReducer.selected
  );
  const files = useSelector((state: RootState) => state.filesReducer.files);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!folders.length) asyncLoadFolders(dispatch);
  }, []);

  useEffect(() => {
    if (!files.length) asyncLoadFiles(dispatch);
  }, []);

  const [search, setSearch] = useState("");

  return (
    <>
      {folders.length && (
        <Helmet>
          <title>{folders[selectedFolders].name} | NoDrive</title>
        </Helmet>
      )}
      <Container className="container mx-auto min-h-screen flex flex-col justify-between">
        <HeaderSearch search={search} setSearch={setSearch} />

        <div className="container p-4 flex-1">
          <BreadcrumbLayout />
          <div className="grid grid-flow-col col-span-12 py-4 md:py-8 gap-2">
            <LayoutSidebar />
            <Divider orientation="vertical" />
            <div className="col-span-11 py-4 px-3">
              <Archive search={search} />
            </div>
          </div>
        </div>

        <Footer />
      </Container>
    </>
  );
}
