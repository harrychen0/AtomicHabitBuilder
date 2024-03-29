import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import OpenAIApi from "openai";

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAIApi({
  api_key: process.env.OPENAI_API_KEY,
});

const habitSchema = new mongoose.Schema({
  goal: String,
  habit: String,
  recommendations: [String],
});

const HabitModel = mongoose.model("Habit", habitSchema);

app.post("/processGoal", async (req, res) => {
  // Expect to get a string containing a goal
  const goal = req.body.goal;
  const promptAddition =
    ": give me 10 different habits I can start that can help lead me to this goal. Return each habit on a new line.";
  const completePrompt = goal.concat(promptAddition);

  // Send user input to OpenAI's API for processing
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: completePrompt }],
    model: "gpt-3.5-turbo",
  });

  // Split the text into individual habit items using the delimiter "\n\n"
  const habits = completion.choices[0].message.content.split("\n");
  res.json({ output: habits });
});

app.post("/processHabit", async (req, res) => {
  // Expect to get a string containing a habit
  const habit = req.body.habit;
  const goal = req.body.goal;

  const createGoodHabitQuery =
    "I am working towards this goal: " +
    goal +
    ". As a part of this goal I am going to start doing this habit: " +
    habit +
    ". Provide a recommendation I can do to accomplish this habit for each of these four laws: Make it obvious by ... ; Make it attractive by ... ; Make it easy by ... ; Make it satisfying by ... ;" +
    "Return the output in 4 lines, one line for each law, no extra spaces, and replace the ... in each law with your recommendation. Make each line a complete sentence.";

  // Send user input to OpenAI's API for processing
  const output = await openai.chat.completions.create({
    messages: [{ role: "user", content: createGoodHabitQuery }],
    model: "gpt-3.5-turbo",
  });

  // Split the text into individual habit items using the delimiter "\n\n"
  const completeHabit = output.choices[0].message.content.split("\n");

  // Save the completeHabit data to MongoDB
  const newHabit = new HabitModel({
    goal: goal,
    habit: habit,
    recommendations: completeHabit,
  });

  // Save the new habit to the database
  try {
    await newHabit.save();
    res.json({ output: completeHabit });
  } catch (error) {
    res.status(500).json({ error: "Error saving habit to database" });
  }
});

app.get("/fetchDetailedPlan", async (req, res) => {
  try {
    // Fetch detailed plan data from MongoDB
    const detailedPlan = await HabitModel.find(
      {},
      { _id: 0, goal: 1, habit: 1, recommendations: 1 }
    );

    res.json(detailedPlan);
    console.log(detailedPlan);
  } catch (error) {
    console.error("Error fetching detailed plan:", error);
    res.status(500).json({ error: "Error fetching detailed plan" });
  }
});

mongoose
  .connect(`${process.env.MONGO_DB_CONN_URL}`, {
    dbName: "HabitBuilder",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
