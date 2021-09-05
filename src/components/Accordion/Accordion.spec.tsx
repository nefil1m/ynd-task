import { fireEvent, render } from '@testing-library/react';
import { Accordion, AccordionContent, AccordionToggle } from './Accordion';

const accordion = (
  <Accordion>
    <AccordionToggle>
      toggle
    </AccordionToggle>
    <AccordionContent data-testid="content">
      content
    </AccordionContent>
  </Accordion>
);

describe('accordion', () => {
  it('should display closed by default', () => {
    const { queryByText } = render(accordion);

    expect(queryByText('content')).toBeNull();
  });

  it('should open on click', () => {
    const { getByText } = render(accordion);

    fireEvent.click(getByText('toggle'));

    expect(getByText('content')).toBeInTheDocument();
  });

  it('should close on click', () => {
    const { getByText, queryByText } = render(accordion);

    fireEvent.click(getByText('toggle'));

    expect(getByText('content')).toBeInTheDocument();

    fireEvent.click(getByText('toggle'));

    expect(queryByText('content')).toBeNull();
  });
});
