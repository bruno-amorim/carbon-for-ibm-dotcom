/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Field, SubmissionError, reduxForm, reducer as reduxFormReducer } from 'redux-form';
import CDSButton from '@carbon/web-components/es/components-react/button/button.js';
import CDSFormItem from '@carbon/web-components/es/components-react/form/form-item.js';
import CDSTextInput from '@carbon/web-components/es/components-react/text-input/text-input.js';
import CDSInlineNotification from '@carbon/web-components/es/components-react/notification/inline-notification.js';
import './index.css';

const reducer = combineReducers({
  form: reduxFormReducer,
});
const store = createStore(reducer);

const submit = async (values) => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500)
  ); // Simulates server latency
  if (!values.username) {
    throw new SubmissionError({
      username: 'User does not exist',
      _error: 'Login failed!',
    });
  } else if (!['john', 'anne'].includes(values.username)) {
    throw new SubmissionError({
      username: 'Wrong user name (Has to be john or anne)',
      _error: 'Login failed!',
    });
  } else if (values.password !== 'redux-form') {
    throw new SubmissionError({
      password: 'Wrong password (Has to be the package name this demo depends on)',
      _error: 'Login failed!',
    });
  } else {
    alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`); // eslint-disable-line no-alert
  }
};

const FieldImpl = ({ input, label, type, meta: { touched, error } }) => {
  const validityMessage = !touched ? undefined : error;
  return (
    <CDSFormItem>
      <CDSTextInput
        {...input}
        invalid={Boolean(validityMessage)}
        label-text={label}
        type={type}
        placeholder={label}
        validityMessage={validityMessage}
      />
    </CDSFormItem>
  );
};

const SubmitValidationForm = reduxForm({
  form: 'submitValidation',
})(({ error, handleSubmit, pristine, reset, submitting }) => (
  <form>
    {error && (
      <CDSInlineNotification kind="error" title="Login failed" subtitle="Please correct below errors." hideCloseButton={true} />
    )}
    <Field name="username" type="text" component={FieldImpl} label="Username" />
    <Field name="password" type="password" component={FieldImpl} label="Password" />
    <div className="cds-ce-demo-redux-form--btn-container">
      {/*
          NOTE: `onsubmit` event (with `type="submit"`) does not work across shadow DOM boundary
          (does not have `composed` flag, etc.) and thus we handle `onclick` directly here
        */}
      <CDSButton disabled={submitting} onClick={handleSubmit(submit)}>
        Log in
      </CDSButton>
      <CDSButton kind="secondary" disabled={pristine || submitting} onClick={reset}>
        Clear Values
      </CDSButton>
    </div>
  </form>
));

const App = () => (
  <Provider store={store}>
    <SubmitValidationForm />
  </Provider>
);

render(<App />, document.getElementById('root'));
