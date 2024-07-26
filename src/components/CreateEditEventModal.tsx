import {
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import { useCalendarContext } from "../providers/CalendarProvider";
import { useCallback, useEffect, useState } from "react";

export const CreateEditEventModal = () => {
  const { selectedDay, dispatchEvent, showModal, setShowModal, selectedEvent } =
    useCalendarContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  console.log(selectedDay.format("dddd, MMMM DD"));

  const handleOnCreate = useCallback(() => {
    const newEvent = {
      title,
      description,
      day: selectedDay.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchEvent({ type: "update", payload: newEvent });
    } else {
      dispatchEvent({ type: "create", payload: newEvent });
    }

    setShowModal(false);
  }, [
    selectedEvent,
    selectedDay,
    title,
    description,
    setShowModal,
    dispatchEvent,
  ]);

  useEffect(() => {
    setTitle(selectedEvent ? selectedEvent.title : "");
    setDescription(selectedEvent ? selectedEvent.description : "");
  }, [selectedEvent]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal isOpen={showModal} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent p={"20px 20px 0"}>
        <Flex gap={"5px"} justifyContent={"flex-end"}>
          {selectedEvent && (
            <IconButton
              onClick={() => {
                dispatchEvent({ type: "delete", payload: selectedEvent });

                handleClose();
              }}
              aria-label="Delete Event"
              icon={<DeleteIcon color="red.500" />}
            />
          )}

          <IconButton
            onClick={handleClose}
            aria-label="Close"
            icon={<CloseIcon color="gray.700" />}
          />
        </Flex>

        <Flex gap={"10px"} flexDir={"column"}>
          <Input
            placeholder={"Add title"}
            variant="flushed"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Flex>{selectedDay.format("dddd, MMMM DD")}</Flex>

          <Input
            placeholder={"Add a description"}
            variant="flushed"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Flex>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleOnCreate}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
