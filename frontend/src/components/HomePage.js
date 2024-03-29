import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Flex,
  Image,
} from "@chakra-ui/react";

function HomePage() {
  const [typedText, setTypedText] = useState("");
  const textToType =
    "An AI powered habit creator and tracker to help you achieve your goals";

  useEffect(() => {
    const typeText = () => {
      for (let i = 0; i < textToType.length; i++) {
        setTimeout(() => {
          setTypedText((prevText) => prevText + textToType[i]);
        }, 100 * i);
      }
    };

    typeText();
  }, []);

  return (
    <Box
      bg="#1A202C"
      color="white"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {/* Heading */}
      <Box p={5} textAlign="center">
        <Heading as="h1" size="xl">
          Welcome to Habit Builder
        </Heading>
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          {typedText}
        </Text>
      </Box>

      {/* Images */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={8}
        mb={12}
      >
        <Image
          src="/veggies.png"
          alt="Image 1"
          style={{ maxWidth: "250px", margin: "0 20px" }}
        />
        <Image
          src="/meditation2.png"
          alt="Image 2"
          style={{ maxWidth: "205px", margin: "0 20px" }}
        />
        <Image
          src="/water.png"
          alt="Image 3"
          style={{ maxWidth: "250px", margin: "0 20px" }}
        />
      </Box>

      {/* Text */}
      <Box
        p={5}
        bg="teal"
        color="white"
        textAlign="center"
        display="inline-block"
        fontSize="xl"
        mb={12}
        borderRadius="10"
      >
        <Heading as="h2" size="lg" mb={4}>
          How Does It Work?
        </Heading>
        <Text>
          1. Enter a goal you want to achieve
          <br />
          2. Habit Builder creates habits that achieve this goal <br />
          3. Choose your preferred habits or create your own <br />
          4. Habit Builder creates a plan for each habit <br />
          5. Track your progress in the Habit Builder dashboard <br />
          6. Follow your plans and see improved habits!
        </Text>
      </Box>

      {/* Title */}
      <Heading as="h2" size="lg" mb={4}>
        Plan Philosophies
      </Heading>

      {/* Panels*/}
      <Box p={5}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Box
            bg="teal"
            flex="1"
            mr={{ md: 4 }}
            borderRadius="10"
            padding="10px"
          >
            <Heading as="h3" size="lg" mb={1} textAlign="center">
              The 1st Law: Make It Obvious
            </Heading>
            <UnorderedList>
              <ListItem>
                Fill out the Habits Scorecard. Write down your current habits to
                become aware of them.
              </ListItem>
              <ListItem>
                Use implementation intentions: “I will [BEHAVIOR] at [TIME] in
                [LOCATION].”
              </ListItem>
              <ListItem>
                Use habit stacking: “After [CURRENT HABIT], I will [NEW HABIT]"{" "}
              </ListItem>
              <ListItem>
                {" "}
                Design your environment. Make the cues of good habits obvious
                and visible.{" "}
              </ListItem>
            </UnorderedList>
          </Box>
          <Box
            bg="teal"
            flex="1"
            ml={{ md: 4 }}
            borderRadius="10"
            padding="10px"
          >
            <Heading as="h3" size="lg" mb={1} textAlign="center">
              The 2nd Law: Make It Attractive
            </Heading>
            <UnorderedList>
              <ListItem>
                Use habit stacking: “After [CURRENT HABIT], I will [NEW HABIT].”
              </ListItem>
              <ListItem>
                Design your environment. Make the cues of good habits obvious
                and visible.
              </ListItem>
              <ListItem>
                {" "}
                Create a motivation ritual. Do something you enjoy immediately
                before a difficult habit.{" "}
              </ListItem>
            </UnorderedList>
          </Box>
        </Flex>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          mt={4}
        >
          <Box
            bg="teal"
            flex="1"
            mr={{ md: 4 }}
            padding="10px"
            borderRadius="10"
          >
            <Heading as="h3" size="lg" mb={1} textAlign="center">
              The 3rd Law: Make It Easy
            </Heading>
            <UnorderedList>
              <ListItem>
                Reduce friction. Decrease the number of steps between you and
                your good habits.
              </ListItem>
              <ListItem>
                Prime the environment. Prepare your environment to make future
                actions easier.
              </ListItem>
              <ListItem>
                Master the decisive moment. Optimize the small choices that
                deliver outsized impact.{" "}
              </ListItem>
              <ListItem>
                Use the Two-Minute Rule. Downscale your habits until they can be
                done in two minutes or less.{" "}
              </ListItem>
              <ListItem>
                Automate your habits. Invest in technology and onetime purchases
                that lock in future behavior.{" "}
              </ListItem>
            </UnorderedList>
          </Box>
          <Box
            bg="teal"
            flex="1"
            ml={{ md: 4 }}
            borderRadius="10"
            padding="10px"
          >
            <Heading as="h3" size="lg" mb={1} textAlign="center">
              The 4th Law: Make It Satisfying
            </Heading>
            <UnorderedList>
              <ListItem>
                Use reinforcement. Give yourself an immediate reward when you
                complete your habit.{" "}
              </ListItem>
              <ListItem>
                Make “doing nothing” enjoyable. When avoiding a bad habit,
                design a way to see the benefits.
              </ListItem>
              <ListItem>
                Use a habit tracker. Keep track of your habit streak and “don’t
                break the chain.”
              </ListItem>
              <ListItem>
                Never miss twice. When you forget to do a habit, make sure you
                get back on track immediately.{" "}
              </ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default HomePage;
