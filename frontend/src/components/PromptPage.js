import React, { useState } from "react";
import { Box, Button, Flex, Input, Text, Grid } from "@chakra-ui/react";
import GeneratedHabitList from "./GeneratedHabitList";

function PromptPage() {
  const [goal, setGoal] = useState("");
  const [submittedGoal, setSubmittedGoal] = useState("");
  const [habit, setHabit] = useState("");
  const [customHabits, setCustomHabits] = useState([]);
  const [habits, setHabits] = useState([]);

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleGoalSubmit = async () => {
    setSubmittedGoal(goal);
    setGoal("");

    const response = await fetch(`http://localhost:3001/processGoal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal }),
    });

    if (response.ok) {
      const data = await response.json();
      setHabits(data.output);
      console.log("Response Successful");
    } else {
      console.log("Response Failed");
    }
  };

  const handleHabitChange = (event) => {
    setHabit(event.target.value);
  };

  const handleHabitSubmit = async () => {
    setCustomHabits([...customHabits, habit]);
    setHabit("");
  };

  const handleSubmitHabits = async (selectedHabits) => {
    for (const habit of selectedHabits) {
      try {
        const response = await fetch("http://localhost:3001/processHabit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ habit: habit, goal: submittedGoal }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`Habit ${habit} submitted successfully!`);
          console.log("Detailed plan: ", data.output);
        } else {
          console.log(`Failed to submit habit ${habit}.`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    console.log("Completed submission!");
  };

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={6}
      backgroundColor="#1A202C"
      color="white"
      p={5}
      minHeight="100vh"
      maxWidth="100%"
    >
      <Box padding="20px">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Get started with Habit Builder!
        </Text>

        <Text mb={2}>1. Set the goal you want to achieve:</Text>
        <Flex justifyContent="left">
          <Input
            value={goal}
            placeholder="e.g: I want to be healthier"
            mb={4}
            width="300px"
            onChange={handleGoalChange}
          />
          <Box width="20px" />
          <Button onClick={handleGoalSubmit} colorScheme="teal">
            Add Goal
          </Button>
        </Flex>

        <Text mb={2}>
          2. Habit Builder generates habits that achieve this goal:
        </Text>

        <Text mb={2}>
          3. Choose desired habits from the generated list or create your own
          desired habit.
        </Text>
        <Flex justifyContent="left">
          <Input
            placeholder="e.g: Exercise for 30 minutes daily"
            mb={4}
            width="300px"
            onChange={handleHabitChange}
          />
          <Box width="20px" />
          <Button onClick={handleHabitSubmit} colorScheme="teal">
            Add Habit
          </Button>
          <Box width="20px" />
        </Flex>
        <Text mb={2}>
          4. Habit Builder will create a detailed plan for your habit based on
          the Atomic Habits template!
        </Text>
      </Box>

      <Box backgroundColor="#253140" borderRadius="10px" padding="20px">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Your goal: {submittedGoal}
        </Text>
        {submittedGoal && (
          <GeneratedHabitList
            habits={habits}
            customHabits={customHabits}
            onSubmitHabits={handleSubmitHabits}
          />
        )}
      </Box>
    </Grid>
  );
}
export default PromptPage;
