import { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, VStack } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddEvent = () => {
    if (eventName.trim() && eventDescription.trim()) {
      setEvents([...events, { name: eventName, description: eventDescription }]);
      setEventName("");
      setEventDescription("");
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventName(event.name);
    setEventDescription(event.description);
    onOpen();
  };

  const handleUpdateEvent = () => {
    const updatedEvents = events.map((e) => (e === editingEvent ? { ...e, name: eventName, description: eventDescription } : e));
    setEvents(updatedEvents);
    setEditingEvent(null);
    setEventName("");
    setEventDescription("");
    onClose();
  };

  const handleDeleteEvent = (event) => {
    const updatedEvents = events.filter((e) => e !== event);
    setEvents(updatedEvents);
  };

  return (
    <Container maxW="md" py={8}>
      <Heading mb={6}>Event Management</Heading>
      <Flex mb={4}>
        <Input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} mr={2} />
        <Textarea placeholder="Event Description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} mr={2} />
        <Button colorScheme="teal" onClick={handleAddEvent}>
          <FaPlus />
        </Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        {events.map((event, index) => (
          <Box key={index} p={4} borderWidth={1} borderRadius={8} boxShadow="md" display="flex" justifyContent="space-between" alignItems="center">
            <div>
              <Heading size="md">{event.name}</Heading>
              <p>{event.description}</p>
            </div>
            <Flex>
              <Button colorScheme="blue" mr={2} onClick={() => handleEditEvent(event)}>
                <FaEdit />
              </Button>
              <Button colorScheme="red" onClick={() => handleDeleteEvent(event)}>
                <FaTrash />
              </Button>
            </Flex>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} mb={4} />
            <Textarea placeholder="Event Description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateEvent}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
