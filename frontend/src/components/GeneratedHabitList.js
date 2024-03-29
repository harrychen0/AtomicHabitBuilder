import { Text, Box, Button, Spinner, Flex } from "@chakra-ui/react";
import { useState } from "react";

const GeneratedHabitList = ({ habits, customHabits, onSubmitHabits }) => {
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [selectedCustomHabits, setSelectedCustomHabits] = useState([]);

  const handleClick = (index) => {
    const isSelected = selectedHabits.includes(index);
    if (isSelected) {
      setSelectedHabits(
        selectedHabits.filter((selectedHabit) => selectedHabit !== index)
      );
    } else {
      setSelectedHabits([...selectedHabits, index]);
    }
  };
  
  const handleCustomHabitsClick = (index) => {
    const isSelected = selectedCustomHabits.includes(index);
    if (isSelected) {
      setSelectedCustomHabits(
        selectedCustomHabits.filter((selectedHabit) => selectedHabit !== index)
      );
    } else {
      setSelectedCustomHabits([...selectedCustomHabits, index]);
    }
  };

  const handleSubmit = () => {
    const selectedHabitsList = selectedHabits.map((index) => {
      const habit = habits[index];
      return habit.replace(/^\d+\.\s/, "");
    });
    const selectedCustomHabitsList = selectedCustomHabits.map(
      (index) => customHabits[index]
    );
    const allSelectedHabits = [
      ...selectedHabitsList,
      ...selectedCustomHabitsList,
    ];
    onSubmitHabits(allSelectedHabits);
  };

  return (
    <Box>
      {habits.length === 0 ? (
        <Spinner size="xl" color="teal" />
      ) : (
        <>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Choose your preferred habits to add to your plan, then submit to get
            extra details on each.
          </Text>
          <Flex wrap="wrap">
            {habits.map((habit, index) => (
              <Button
                key={index}
                width="100%"
                height="auto"
                borderRadius="10px"
                colorScheme="teal"
                color="white"
                variant={selectedHabits.includes(index) ? "solid" : "outline"}
                padding="10px"
                margin="1rem"
                _hover={{ bg: "#2D797B" }}
                onClick={() => handleClick(index)}
                whiteSpace="normal"
              >
                <Text fontSize="l">{habit}</Text>
              </Button>
            ))}

            {customHabits.map((customHabit, index) => (
              <Button
                key={index}
                width="100%"
                height="auto"
                borderRadius="10px"
                colorScheme="teal"
                color="white"
                variant={
                  selectedCustomHabits.includes(index) ? "solid" : "outline"
                }
                padding="10px"
                margin="1rem"
                _hover={{ bg: "#2D797B" }}
                onClick={() => handleCustomHabitsClick(index)}
                whiteSpace="normal"
              >
                <Text fontSize="l">
                  {habits.length + index + 1}. {customHabit}
                </Text>
              </Button>
            ))}
          </Flex>
          {habits.length > 0 && (
            <Button onClick={handleSubmit} colorScheme="teal" mt="1rem">
              Submit Selected Habits
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default GeneratedHabitList;
