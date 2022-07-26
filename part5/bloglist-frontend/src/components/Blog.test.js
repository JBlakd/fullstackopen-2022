import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let blog
let user
let component
let div

beforeEach(() => {
  blog = {
    likes: 289412,
    title: 'it be like that sometimes',
    author: 'Jaboukie Young-White',
    url: 'https://twitter.com/jaboukie/status/1026509837239169024',
    user: { username: 'jaboukie', name: 'Jaboukie Young-White', id: '62d96dc571dff777d069fde8' },
    id: '62d9734285f38b2814da544e'
  }

  user = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…TI0fQ.u1tJ2GEQqW1df_AcShBr-dNiJVFFxJ4Af6Kpz0fq2TI',
    username: 'Future',
    name: 'Nayvadius DeMun Wilburn'
  }

  component = render(<Blog blog={blog} user={user} />)
  div = component.container.querySelector('.blog')
})

test('renders content', () => {
  expect(div).toHaveTextContent('it be like that sometimes')
  expect(div).toHaveTextContent('Jaboukie Young-White')
  expect(div).not.toHaveTextContent('https://twitter.com/jaboukie/status/1026509837239169024')
  expect(div).not.toHaveTextContent('likes')
})

test('renders url and likes after toggle shown', async () => {
  expect(div).not.toHaveTextContent('https://twitter.com/jaboukie/status/1026509837239169024')
  expect(div).not.toHaveTextContent('likes')
  const sessionUser = userEvent.setup()
  const toggleIsShownButton = component.container.querySelector('.toggleIsShownButton')
  console.log('toggleIsShownButton: ',)
  await sessionUser.click(toggleIsShownButton)
  expect(div).toHaveTextContent('https://twitter.com/jaboukie/status/1026509837239169024')
  expect(div).toHaveTextContent('likes')
})
