import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { routsNameMain } from '../data/routsName'
import RootLayout from '../Layout/RootLayout'
import FourOhFour from '../pages/404'
import Loading from '../pages/loading'

import { Login } from '../pages/main/login'

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

type Props = {
  children: JSX.Element
}

function PrivateLogin({ children }: Props) {
  const user = null

  if (user != null) {
    return <Navigate to={'/'} />
  }

  return children
}

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
                <Home />
              </React.Suspense>
            }
          />
          {/* Admin */}
          <Route
            path={routsNameMain.admin}
            element={
              <React.Suspense fallback={<Loading />}>
                <Admin />
              </React.Suspense>
            }
          />

          {/* Professors */}
          <Route
            path={routsNameMain.professor}
            element={
              <React.Suspense fallback={<Loading />}>
                <Professor />
              </React.Suspense>
            }
          />
          {/* Students */}
          <Route
            path={routsNameMain.student}
            element={
              <React.Suspense fallback={<Loading />}>
                <Student />
              </React.Suspense>
            }
          />
          {/* courses */}
          <Route
            path={routsNameMain.course}
            element={
              <React.Suspense fallback={<Loading />}>
                <Course />
              </React.Suspense>
            }
          />
          {/* Module */}
          <Route
            path={routsNameMain.module}
            element={
              <React.Suspense fallback={<Loading />}>
                <Module />
              </React.Suspense>
            }
          />
          {/* Exams */}
          <Route
            path={routsNameMain.exam.index}
            element={
              <React.Suspense fallback={<Loading />}>
                <Exam />
              </React.Suspense>
            }
          />
          {/* Exams Create */}
          <Route
            path={routsNameMain.exam.create}
            element={
              <React.Suspense fallback={<Loading />}>
                <ExamCreate />
              </React.Suspense>
            }
          />
          {/* Exams Edit */}
          <Route
            path={routsNameMain.exam.edit}
            element={
              <React.Suspense fallback={<Loading />}>
                <Exam />
              </React.Suspense>
            }
          />

          {/* Exam Result */}
          <Route
            path={routsNameMain.exam.result}
            element={
              <React.Suspense fallback={<Loading />}>
                <Result />
              </React.Suspense>
            }
          />
          {/* Exam Result Checke */}
          <Route
            path={routsNameMain.exam.check}
            element={
              <React.Suspense fallback={<Loading />}>
                <ExamCheck />
              </React.Suspense>
            }
          />
          {/* Tasks */}
          <Route
            path={routsNameMain.task.index}
            element={
              <React.Suspense fallback={<Loading />}>
                <Task />
              </React.Suspense>
            }
          />
          {/* Tasks Create */}
          <Route
            path={routsNameMain.task.create}
            element={
              <React.Suspense fallback={<Loading />}>
                <TaskCreate />
              </React.Suspense>
            }
          />
          {/* Tasks Result*/}
          <Route
            path={routsNameMain.task.result}
            element={
              <React.Suspense fallback={<Loading />}>
                <TaskSubmission />
              </React.Suspense>
            }
          />
          {/* Tasks Result Check*/}
          <Route
            path={routsNameMain.task.check}
            element={
              <React.Suspense fallback={<Loading />}>
                <TaskCheck />
              </React.Suspense>
            }
          />
          {/* Materials */}
          <Route
            path={routsNameMain.material}
            element={
              <React.Suspense fallback={<Loading />}>
                <Material />
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
