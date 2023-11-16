'use client'

import React, { useEffect } from 'react'

import { useGetTasksQuery } from '@/redux/api/taskApi'

import { AuthRequiredError } from '../lib/AuthRequiredError'
/* const session = null */

export default function Tasks() {

	/* if(!session) throw new AuthRequiredError */

  const { data, isLoading, error } = useGetTasksQuery()

  let content = null

  if(isLoading) content = <div>Is loading...</div>

  if(error) content = <div>An error occured...</div>

  if (data) {
    content = (
      data?.map((task, index) => (
        <div key={`task${index}`}>{task.title}</div>
      ))
    )
  }

  return <>{content}</>
}
