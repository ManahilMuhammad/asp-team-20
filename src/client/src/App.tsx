import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import AuthPage from "./pages/Auth";
import ProtectedRoute from "./components/protected-route";

import NotFoundPage from "./pages/404";

import RecipePage from "./pages/Recipes/main";
import CreateRecipe from "./pages/Recipes/Create/main";
import SavedRecipes from "./pages/Recipes/Saved/main";
import SearchRecipes from "./pages/Recipes/SearchRecipes/main";
import SuggestedRecipes from "./pages/Recipes/Suggested/main";
import RecipeView from "./pages/Recipes/View/main";
import InvalidRecipeView from "./pages/Recipes/View/main-invalid";
import RegistrationPage from "./pages/Registration";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProtectedRoute children={<ProfilePage />} />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/registration" element={<RegistrationPage />} />

        <Route path="/recipes" element={<RecipePage />}>
          <Route path="create" element={<ProtectedRoute children={<CreateRecipe />} />} />
          <Route path="saved" element={<ProtectedRoute children={<SavedRecipes />} />} />
          <Route path="search" element={<SearchRecipes />} />
          <Route path="suggestions" element={<ProtectedRoute children={<SuggestedRecipes />} />} />
          <Route path="view/:id" element={<RecipeView />} />
          <Route path="view" element={<InvalidRecipeView />} />
        </Route>

        {/* 404 Error page when navigating to an unknown page */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default App
