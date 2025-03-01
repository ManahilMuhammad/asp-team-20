import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import AuthPage from "./pages/Auth";
import ProtectedRoute from "./components/protected-route";

import RecipePage from "./pages/Recipes/main";
import CreateRecipe from "./pages/Recipes/Create/main";
import SavedRecipes from "./pages/Recipes/Saved/main";
import SearchRecipes from "./pages/Recipes/SearchRecipes/main";
import SuggestedRecipes from "./pages/Recipes/Suggested/main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProtectedRoute children={<ProfilePage />} />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/recipes" element={<RecipePage />}>
          <Route index element={<>Parent</>} />
          <Route path="create" element={<ProtectedRoute children={<CreateRecipe />} />} />
          <Route path="saved" element={<ProtectedRoute children={<SavedRecipes />} />} />
          <Route path="search" element={<SearchRecipes />} />
          <Route path="suggestions" element={<SuggestedRecipes />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App
