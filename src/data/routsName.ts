const baseMain = 'main'

export const routsNameMain = {
  home: `/`,
  admin: `/admin`,
  login: `/login`,

  professor: `/professor`,
  student: `/student`,
  course: `/course`,
  module: `/module`,

  // Exames
  exam: {
    index: `/exam`,
    create: `/exam/create`,
    edit: `/exam/edit/:examId`,
    editStr: `/exam/edit`,
    // Result
    result: `/exam/result`,
    check: `/exam/result/check/:resultId`,
    checkString: `/exam/result/check`
  },

  // Tarefas
  task: {
    index: `/task`,
    create: `/task/create`,
    edit: `/task/edit/:taskId`,
    editStr: `/task/edit`,
    student: `/task/result/student/:studentId`,
    // Result
    result: `/task/result`,
    check: `/task/result/student/check/:studentId/:taskId`,
    checkString: `/task/result/student/check`
  },

  material: `/material`
}
