import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PromptPage from "./components/PromptPage";
import HabitsPage from "./components/HabitsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/plan" element={<HabitsPage />} />
      <Route path="/prompt" element={<PromptPage />} />
    </Routes>
  );
}

export default AppRoutes;
