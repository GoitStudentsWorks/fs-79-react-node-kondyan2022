import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import DiaryPage from './pages/DiaryPage/DiaryPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ExercisesPage from './pages/ExercisesPage/ExercisePage';
import Error404Page from './pages/Error404Page/Error404Page';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { useSelector } from 'react-redux';
import { isLogin } from './redux/selectors';
import { ExerciseList } from './components/Exersizes/ExerciseList/ExerciseList';
import { BodyPartsBoard } from './components/Exersizes/ExercisesBoard/BodyPartsBoard';
import { MusclesBoard } from './components/Exersizes/ExercisesBoard/MusclesBoard';
import { EquipmentBoard } from './components/Exersizes/ExercisesBoard/EquipmentBoard';

import GoogleLoginPage from './pages/GoogleLoginPage/GoogleLoginPage';
import { useGetCurrentUserQuery } from './redux/features/authEndpoints';
// import { useGetCurrentUserQuery } from './redux/features/authEndpoints';
//
// import { selectToken } from './redux/selectors';
// import { useTokenExpirationCheck } from './hooks/controlCurrentUser';

function App() {
  const isLoggedIn = useSelector(isLogin);

  // const { data: userData } = useGetCurrentUserQuery();
  // console.log('Route>>>>>>>>', userData);
  const userData = { profile: false };
  const profileFilled = userData?.profile ? true : false;
  console.log({ profileFilled });

  // const tokenInState = useSelector(selectToken); // токен.

  // tokenInState && useTokenExpirationCheck(tokenInState, 3000);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={
            <PrivateRoute
              redirectTo="/welcome"
              isLoggedIn={isLoggedIn}
              profileFilled={profileFilled}
            >
              <DiaryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/welcome"
          element={
            <PublicRoute restricted isLoggedIn={isLoggedIn}>
              <WelcomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute restricted isLoggedIn={isLoggedIn}>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute restricted isLoggedIn={isLoggedIn}>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/googlelogin"
          element={
            <PublicRoute restricted isLoggedIn={isLoggedIn}>
              <GoogleLoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              redirectTo="/signin"
              selfCall
              isLoggedIn={isLoggedIn}
              profileFilled={profileFilled}
            >
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute
              redirectTo="/signin"
              isLoggedIn={isLoggedIn}
              profileFilled={profileFilled}
            >
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/exercises"
          element={
            <PrivateRoute
              redirectTo="/signin"
              isLoggedIn={isLoggedIn}
              profileFilled={profileFilled}
            >
              <ExercisesPage />
            </PrivateRoute>
          }
        >
          <Route path="bodyparts" element={<BodyPartsBoard />} />
          <Route path="muscles" element={<MusclesBoard />} />
          <Route path="equipment" element={<EquipmentBoard />} />
          <Route path="groups/:groupId" element={<ExerciseList />} />
          {/* може роути тут */}
        </Route>
        <Route path="*" element={<Error404Page />} />
      </Route>
    </Routes>
  );
}
export default App;
