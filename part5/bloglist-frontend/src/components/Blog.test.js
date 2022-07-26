import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    likes: 289412,
    title: 'it be like that sometimes',
    author: 'Jaboukie Young-White',
    url: 'https://twitter.com/jaboukie/status/1026509837239169024',
    user: { username: 'jaboukie', name: 'Jaboukie Young-White', id: '62d96dc571dff777d069fde8' },
    id: '62d9734285f38b2814da544e'
  }

  const user = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…TI0fQ.u1tJ2GEQqW1df_AcShBr-dNiJVFFxJ4Af6Kpz0fq2TI',
    username: 'Future',
    name: 'Nayvadius DeMun Wilburn'
  }

  const { container } = render(<Blog blog={blog} user={user} />)
  const div = container.querySelector('.blog')
  console.log('div: ', div)
  expect(div).toHaveTextContent('it be like that sometimes')
  expect(div).toHaveTextContent('Jaboukie Young-White')
  expect(div).not.toHaveTextContent('https://twitter.com/jaboukie/status/1026509837239169024')
  expect(div).not.toHaveTextContent('likes')
})