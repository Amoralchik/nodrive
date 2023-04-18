import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Group, Input, Modal, NavLink, Text } from "@mantine/core";

export function FolderModal({
  onConfirm,
  title,
  label,
  color,
  infoText,
}: {
  onConfirm: (
    name: string,
    close: () => void,
    setName: (args: string) => void
  ) => void;
  title: string;
  label: string;
  infoText: string;
  color?: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        <div className="space-y-2">
          <Text>{infoText}</Text>
          <Input
            placeholder="Enter Folder name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Group>
            <Button onClick={() => onConfirm(name, close, setName)}>
              Submit
            </Button>
            <Button onClick={close}>Cancel</Button>
          </Group>
        </div>
      </Modal>

      <NavLink label={label} color={color} onClick={open} />
    </>
  );
}
