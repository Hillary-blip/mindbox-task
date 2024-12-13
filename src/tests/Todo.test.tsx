// src/__tests__/Todo.test.tsx
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Todo from '../components/Todo/Todo';
import userEvent from '@testing-library/user-event';

describe('Todo component', () => {
    it('should render the todo input and button', () => {
        render(<Todo />);
        const inputElement = screen.getByPlaceholderText(/Введите задачу.../i);
        const buttonElement = screen.getByText(/Добавить/i);
        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    it('should add a task to the list when input is provided and button is clicked', () => {
        render(<Todo />);
        const inputElement = screen.getByPlaceholderText(/Введите задачу.../i);
        const buttonElement = screen.getByText(/Добавить/i);

        fireEvent.change(inputElement, { target: { value: 'Test Task' } });
        fireEvent.click(buttonElement);

        const taskItem = screen.getByText(/Test Task/i);
        expect(taskItem).toBeInTheDocument();
    });

    it('should not add a task when input is empty', () => {
        render(<Todo />);
        const inputElement = screen.getByPlaceholderText(/Введите задачу.../i);
        const buttonElement = screen.getByText(/Добавить/i);

        fireEvent.change(inputElement, { target: { value: '' } });
        fireEvent.click(buttonElement);

        const taskItem = screen.queryByText(/Test Task/i);
        expect(taskItem).not.toBeInTheDocument();
    });

    it('should clear the input field after adding a task', () => {
        render(<Todo />);
        const inputElement = screen.getByPlaceholderText(/Введите задачу.../i);
        const buttonElement = screen.getByText(/Добавить/i);

        fireEvent.change(inputElement, { target: { value: 'Test Task' } });
        fireEvent.click(buttonElement);

        expect(inputElement).toHaveValue('');
    });
});