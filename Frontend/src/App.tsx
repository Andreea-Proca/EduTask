import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { SubjectsPage } from "@presentation/pages/SubjectsPage";
import { StudentsPage } from "@presentation/pages/StudentsPage";
import { ProfessorsPage } from "@presentation/pages/ProfessorsPage";
import { AssignmentsPage } from "@presentation/pages/AssignmentsPage";
import { RegisterPage } from "@presentation/pages/RegisterPage";
import { FeedbackPage } from "@presentation/pages/FeedbackPage";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
        {isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />}
        {isAdmin && <Route path={AppRoute.Subjects} element={<SubjectsPage />} />}
        {isAdmin && <Route path={AppRoute.Assignments} element={<AssignmentsPage/>} />}
        {isAdmin && <Route path={AppRoute.Students} element={<StudentsPage/>} />}
        {isAdmin && <Route path={AppRoute.Professors} element={<ProfessorsPage/>} />}
        <Route path={AppRoute.Register} element={<RegisterPage/>} />
        <Route path={AppRoute.Feedback} element={<FeedbackPage/>} />
      </Routes>
    </AppIntlProvider>
}
