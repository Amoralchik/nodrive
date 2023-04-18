import { deleteFile, updateFile } from "@store/slices/files";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ActionIcon,
  Button,
  Card,
  Code,
  Group,
  Image,
  Input,
  LoadingOverlay,
  Menu,
  Modal,
  Text,
  rem,
} from "@mantine/core";
import {
  IconDots,
  IconEdit,
  IconFileZip,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export function FileCard({
  name,
  id,
  createdAt,
  updatedAt,
  codeName,
  mimeType,
}: {
  content: string;
  name: string;
  id: number;
  folderId: number;
  createdAt: string;
  updatedAt: string;
  codeName: string;
  mimeType: string;
}) {
  const dispatch = useDispatch();
  const nameSplit = name.split(".");
  const [stateName, setName] = useState(nameSplit[0]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const modalOpen = () => {
    open();
    setIsImageLoading(true);
  };

  const onDeleteClick = async () => {
    setIsLoading(true);
    const res = await deleteFile(dispatch, id);
    if (res === 200) {
      toast("Item successfully deleted.");
      setIsLoading(false);
    }
  };

  const loadText = async () => {
    const res = await axios.get(`files/${codeName}?full=true`);
    setContent(res.data);
  };

  useEffect(() => {
    if (mimeType.includes("text") && content === "") loadText();
  }, [mimeType]);

  return (
    <Card shadow="md" padding="md">
      <Card.Section onClick={modalOpen} className="cursor-pointer">
        <Image
          src={`http://api.localhost/files/${codeName}`}
          height={160}
          alt={`${codeName}.png`}
        />
      </Card.Section>

      <div className="flex justify-between items-center gap-2 my-2">
        <Text
          size="md"
          className="text-ellipsis whitespace-nowrap font-bold overflow-hidden text-sx tracking-tight"
        >
          {name}
        </Text>

        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          size={800}
          centered
          overlayProps={{
            opacity: 0.55,
            blur: 3,
          }}
        >
          <Group>
            <div className="min-w-full flex gap-2">
              <div className="flex-1">
                <Input
                  className="focus:bg-orange-400"
                  placeholder="file name"
                  value={stateName}
                  variant="filled"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  updateFile(dispatch, `${stateName}.${nameSplit[1]}`, id);
                  close();
                }}
              >
                Submit
              </Button>
              <Button onClick={close}>Cancel</Button>
            </div>

            {mimeType.includes("video") && (
              <video
                controls={!isImageLoading && true}
                onLoadedData={() => {
                  setIsImageLoading(false);
                }}
                src={`http://api.localhost/files/${codeName}?full=true`}
              />
            )}
            {mimeType.includes("image") && (
              <Image
                src={`http://api.localhost/files/${codeName}?full=true`}
                withPlaceholder
                onLoad={() => {
                  setIsImageLoading(false);
                }}
              />
            )}
            {!mimeType.includes("image") &&
              !mimeType.includes("video") &&
              !mimeType.includes("text") && (
                <Image
                  src={`http://api.localhost/files/${codeName}?full=true`}
                  withPlaceholder
                  onLoad={() => {
                    setIsImageLoading(false);
                  }}
                />
              )}
            {mimeType.includes("text") && <Code>{content} </Code>}
            {!mimeType.includes("text") && isImageLoading && (
              <div className="h-32">
                <LoadingOverlay visible={isImageLoading} overlayBlur={2} />
              </div>
            )}
          </Group>
        </Modal>

        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon>
              <IconDots size="1rem" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconEdit size={rem(14)} />}>Edit</Menu.Item>
            <a
              href={`http://api.localhost/files/${codeName}?download=true`}
              download={name}
            >
              <Menu.Item icon={<IconFileZip size={rem(14)} />}>
                Download
              </Menu.Item>
            </a>
            <Menu.Item
              icon={<IconTrash size={rem(14)} />}
              color="red"
              onClick={onDeleteClick}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      <Text mt="xs" color="dimmed" size="sm">
        <p>Created at: {DateTime.fromISO(createdAt).toFormat("yyyy LLL dd")}</p>
        <p>Updated at: {DateTime.fromISO(updatedAt).toFormat("yyyy LLL dd")}</p>
      </Text>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
    </Card>
  );
}
