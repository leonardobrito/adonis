'use strict'

// const Mail = use('Mail')
// const Helpers = use('Helpers')
const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')
const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async (taskInstance) => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  const { email, username} = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()
  const { title } = taskInstance

  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })

  // await Mail.send(
  //   ['emails.new_task'],
  //   { username, title, hasAttachment: !!file },
  //   message => {
  //     message
  //       .to(email)
  //       .from('f.leobrito@gmail.com', 'Leonardo')
  //       .subject('Nova tarefa para você')

  //     if (file) {
  //       message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
  //         filename: file.name
  //       })
  //     }
  //   }
  // )
}
