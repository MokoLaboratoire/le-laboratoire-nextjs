'use client'

import React, { useEffect, useState } from 'react'

import { useAddNewTaskMutation, useGetTasksQuery } from '@/redux/api/taskApi'
import { TaskInterface } from '@/interfaces/TaskInterface'

/* import { AuthRequiredError } from '../../lib/AuthRequiredError' */
/* const session = null */

export default function Tasks() {
  /* if(!session) throw new AuthRequiredError */

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [dateOfCreation, setDateOfCreation] = useState<string>('1995-12-17')
  const [category, setCategory] = useState<string>('')

  useEffect(() => {
    console.log('dateOfCreation', dateOfCreation)
  }, [dateOfCreation])

  const { data, isLoading, error } = useGetTasksQuery()
  const [addNewTask] = useAddNewTaskMutation()

  let content = null

  if (isLoading) content = <div>Is loading...</div>

  if (error) content = <div>An error occured...</div>

  if (data) {
    content = data?.map((task, index) => (
      <div key={`task${index}`}>{task.title}</div>
    ))
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const task: TaskInterface = {
      title: title,
      description: description,
      date_of_creation: new Date(dateOfCreation),
      category: category,
    }

    console.log('task', task)
    addNewTask(task)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          id='title'
          type='text'
          placeholder='Title'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          id='description'
          type='text'
          placeholder='Description'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          id='date_of_creation'
          type='date'
          name='date_of_creation'
          value={dateOfCreation}
          onChange={(e) => setDateOfCreation(e.target.value)}
        />
        <input
          id='category'
          type='text'
          placeholder='Category'
          name='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      {content}
    </>
  )
}
