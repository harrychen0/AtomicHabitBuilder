import React from "react";
import { Flex, Button, Spacer, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Flex p={4} backgroundColor="teal" alignItems="center">
      <Link to="/">
        <Text fontSize="xl" fontWeight="bold" color="white">
          Habit Builder
        </Text>
      </Link>
      <Spacer />
      <Link to="/plan">
        <Button colorScheme="whiteAlpha" mr={2}>
          Stored Habits
        </Button>
      </Link>
      <Box width="20px" />
      <Link to="/prompt">
        <Button colorScheme="whiteAlpha" mr={2}>
          Enter your goal
        </Button>
      </Link>
    </Flex>
  );
}

export default Navbar;
