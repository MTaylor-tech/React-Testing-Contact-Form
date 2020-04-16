import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import ContactForm from "../components/ContactForm";

describe('Contact Form', ()=>{
  const { container } = render(<ContactForm />);
  const fname = container.querySelector('input[name="firstName"]');
  const lname = container.querySelector('input[name="lastName"]');
  const email = container.querySelector('input[name="email"]');
  const message = container.querySelector('textarea[name="message"]');
  const submit = container.querySelector('input[type="submit"]');
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  it('renders ContactForm without crashing', () => {
    render(<ContactForm />);
  });

  it('has placeholders as expected', () => {
    expect(fname.placeholder).toBe('bill');
    expect(lname.placeholder).toBe('luo');
    expect(email.placeholder).toBe('bluebill1049@hotmail.com');
  });

  it('submits correct values', async () => {

    await wait(() => {
      fireEvent.change(fname, {
        target: {
          value: "Freddie"
        }
      })
    });

    await wait(() => {
      fireEvent.change(lname, {
        target: {
          value: "Mercury"
        }
      })
    });

    await wait(() => {
      fireEvent.change(email, {
        target: {
          value: "all.is.one@email.com"
        }
      })
    });

    await wait(() => {
      fireEvent.change(message, {
        target: {
          value: "Love is Love"
        }
      })
    });

    await wait(() => {
      fireEvent.click(submit)
    });

    const results = container.querySelector("pre");
    expect(setState).toHaveBeenCalled();
    expect(container.state().data).toBe(
      `{
  "firstName": "Freddie",
  "lastName": "Mercury",
  "email": "all.is.one@email.com",
  "message": "Love is Love"
}`
    );
  });
});
