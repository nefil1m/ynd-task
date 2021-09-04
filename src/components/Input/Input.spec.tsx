import {
  render,
  fireEvent,
  screen,
  waitForElement,
} from '@testing-library/react';
import { Formik, Form } from 'formik';
import Input from './Input';

describe('input', () => {
  it('should display errors', async () => {
    const { getByText } = render(
      <Formik
        initialValues={{
          foo: 'bar',
        }}
        onSubmit={(_, { setErrors }) => {
          setErrors({
            foo: 'incorrect value',
          });
        }}
      >
        <Form data-testid="form">
          <Input name="foo" />
        </Form>
      </Formik>,
    );

    fireEvent.submit(screen.getByTestId('form'));

    await waitForElement(() => getByText('incorrect value'));

    expect(getByText('incorrect value')).not.toBeNull();
  });
});
