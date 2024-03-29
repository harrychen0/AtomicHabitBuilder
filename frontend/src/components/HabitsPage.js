import React, { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

function HabitsPage() {
  const [detailedHabits, setDetailedHabits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/fetchDetailedPlan")
      .then((response) => response.json())
      .then((data) => {
        setDetailedHabits(data);
      })
      .catch((error) => {
        console.error("Error fetching detailed plan:", error);
      });
  }, []);

  // Function to group habits by their goals
  const groupHabitsByGoal = () => {
    const groupedHabits = {};
    detailedHabits.forEach((item) => {
      if (!groupedHabits[item.goal]) {
        groupedHabits[item.goal] = [];
      }
      groupedHabits[item.goal].push(item);
    });
    return groupedHabits;
  };

  const groupedHabits = groupHabitsByGoal();

  return (
    <Box
      backgroundColor="#1A202C"
      padding="20px"
      minHeight="100vh"
      maxWidth="100%"
    >
      <Flex
        wrap="wrap"
        backgroundColor="#253140"
        borderRadius="10px"
        padding="20px"
      >
        {Object.keys(groupedHabits).length > 0 ? (
          Object.keys(groupedHabits).map((goal, index) => (
            <Box
              key={index}
              width="100%"
              borderRadius="10px"
              backgroundColor="teal"
              color="white"
              padding="10px"
              margin="1rem"
              whiteSpace="normal"
            >
              <Text fontSize="xl" fontWeight="bold">
                To accomplish your goal: {goal}
              </Text>
              {groupedHabits[goal].map((habit, idx) => (
                <Box
                  key={idx}
                  backgroundColor="#334E68"
                  padding="10px"
                  marginTop="5px"
                  borderRadius="5px"
                >
                  <Text fontSize="l">{habit.habit}</Text>
                  {habit.recommendations.map((recommendation, idx) => (
                    <Box
                      key={idx}
                      backgroundColor="#45678"
                      padding="10px"
                      marginTop="5px"
                      borderRadius="5px"
                    >
                      <Text>{recommendation}</Text>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ))
        ) : (
          <Text>No detailed plan available</Text>
        )}
      </Flex>
    </Box>
  );
}

export default HabitsPage;
