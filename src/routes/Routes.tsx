import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import FourOhFour from '../pages/404'
import Loading from '../pages/loading'

// Layout
import RootLayout from '../Layout/RootLayout'
// Data Route
import { routsNameMain } from '../data/routsName'
// Route
import { Private, PrivateLogin } from './PrivateRoute'

import { Login } from '../pages/main/login'

// Page
import { Home } from '../pages/main/home'
import { Admin } from '../pages/main/admin'
import { Professor } from '../pages/main/professor'
import { Student } from '../pages/main/student'
import { Course } from '../pages/main/course'
import { Module } from '../pages/main/module'
import { Material } from '../pages/main/material'
// Exam
import { Exam } from '../pages/main/exam/exam'
import { Result } from '../pages/main/exam/examResult'
import { ExamCreate } from '../pages/main/exam/examCreate'
import { ExamCheck } from '../pages/main/exam/examCheck'
// Task
import { Task } from '../pages/main/task/task'
import { TaskSubmission } from '../pages/main/task/taskSubmission'
import { TaskCreate } from '../pages/main/task/taskCreate'
import { TaskCheck } from '../pages/main/task/taskCheck'

// const Home = React.lazy(() => import('../pages/main/home'))
export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Home */}
          <Route
            index
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Home />
                </Private>
              </React.Suspense>
            }
          />
          {/* Admin */}
          <Route
            path={routsNameMain.admin}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Admin />
                </Private>
              </React.Suspense>
            }
          />

          {/* Professors */}
          <Route
            path={routsNameMain.professor}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Professor />
                </Private>
              </React.Suspense>
            }
          />
          {/* Students */}
          <Route
            path={routsNameMain.student}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Student />
                </Private>
              </React.Suspense>
            }
          />
          {/* courses */}
          <Route
            path={routsNameMain.course}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Course />
                </Private>
              </React.Suspense>
            }
          />
          {/* Module */}
          <Route
            path={routsNameMain.module}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Module />
                </Private>
              </React.Suspense>
            }
          />
          {/* Exams */}
          <Route
            path={routsNameMain.exam.index}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Exam />
                </Private>
              </React.Suspense>
            }
          />
          {/* Exams Create */}
          <Route
            path={routsNameMain.exam.create}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <ExamCreate />
                </Private>
              </React.Suspense>
            }
          />
          {/* Exams Edit */}
          <Route
            path={routsNameMain.exam.edit}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Exam />
                </Private>
              </React.Suspense>
            }
          />

          {/* Exam Result */}
          <Route
            path={routsNameMain.exam.result}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Result />
                </Private>
              </React.Suspense>
            }
          />
          {/* Exam Result Checke */}
          <Route
            path={routsNameMain.exam.check}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <ExamCheck />
                </Private>
              </React.Suspense>
            }
          />
          {/* Tasks */}
          <Route
            path={routsNameMain.task.index}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Task />
                </Private>
              </React.Suspense>
            }
          />
          {/* Tasks Create */}
          <Route
            path={routsNameMain.task.create}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <TaskCreate />
                </Private>
              </React.Suspense>
            }
          />
          {/* Tasks Result*/}
          <Route
            path={routsNameMain.task.result}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <TaskSubmission />
                </Private>
              </React.Suspense>
            }
          />
          {/* Tasks Result Check*/}
          <Route
            path={routsNameMain.task.check}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <TaskCheck />
                </Private>
              </React.Suspense>
            }
          />
          {/* Materials */}
          <Route
            path={routsNameMain.material}
            element={
              <React.Suspense fallback={<Loading />}>
                <Private>
                  <Material />
                </Private>
              </React.Suspense>
            }
          />
        </Route>

        {/* Login */}
        <Route
          path={routsNameMain.login}
          element={
            <React.Suspense fallback={<Loading />}>
              <PrivateLogin>
                <Login />
              </PrivateLogin>
            </React.Suspense>
          }
        />

        <Route
          path="*"
          element={
            <React.Suspense fallback={<Loading />}>
              <FourOhFour />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
