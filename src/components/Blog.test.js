import React from 'react';
import { screen,render } from '@testing-library/react';
import Blog from './Blog';

describe('Blog component', () => {
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 10,
  };

  test('renders title and author, but not URL or likes by default', () => {
     render(<Blog blog={blog} />);

    expect(screen.getByText(blog.title)).toBeInTheDocument();
    expect(screen.getByText(blog.author)).toBeInTheDocument();
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
    expect(screen.queryByText(`Likes: ${blog.likes}`)).not.toBeInTheDocument();
  });
});