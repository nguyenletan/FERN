import teamImage from '../assets/fern-team-transparent.png';
import guideImage from '../assets/fern-guide-transparent.png';
import fernMark from '../assets/home-fern.png';
import { Buildings, ShieldCheck, ChartBar } from '@phosphor-icons/react';
import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Checkbox from '@cloudscape-design/components/checkbox';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import SpaceBetween from '@cloudscape-design/components/space-between';
import './demo-sign-in.css';
import { DEMO_EMAIL, DEMO_PASSWORD } from './demoCredentials.ts';
import React, { useState } from 'react';

// Demonstration sign-in only; production sign-in will be Midway. The form uses Cloudscape like the rest of the portal.
// Keep the demo session for this browser tab so a refresh does not sign the viewer out.
const SESSION_KEY = 'fern-demo-session';
function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'signed-in';
  } catch {
    return false;
  }
}
function writeSession(signedIn: boolean) {
  try {
    if (signedIn) sessionStorage.setItem(SESSION_KEY, 'signed-in');
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* Storage blocked: the session lasts until the page is refreshed. */
  }
}

const infoText: Record<string, string> = {
  'Privacy information':
    'Use only the published demo credentials. Do not enter your Amazon password or personal or operational information. This preview does not connect to Amazon identity services. An approved production privacy notice is not supplied here.',
  'Preview terms':
    'This copy is for demonstration and review. It is not production approved and does not grant access to Amazon systems. Production terms and approvals must be provided before operational use.',
  'Preview help':
    'Enter demo as both the username and password, then select Sign in. Page links reopen the requested destination after sign-in. For feedback, contact the colleague who supplied this preview; no support ticket is submitted here.',
};

export default function DemoSignIn({ renderApp }: { renderApp: (onSignOut: () => void) => React.ReactNode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(readSession);

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setLoggedIn(true);
        writeSession(true);
      } else {
        setError('Use demo for both the username and password to enter this preview.');
      }
      setLoading(false);
    }, 900);
  }

  if (loggedIn) {
    return renderApp(() => {
      writeSession(false);
      setLoggedIn(false);
      setEmail('');
      setPassword('');
    });
  }

  return (
    <div className="fern-signin">
      <section className="fern-signin-story" aria-label="About FERN">
        <div className="fern-signin-brand">
          <strong>FERN</strong>
          <img src={fernMark} alt="" />
        </div>
        <h2>Digital FM ecosystem</h2>
        <p className="fern-signin-tagline">
          Trusted insights. Smarter decisions.
          <br />
          Better facilities.
        </p>
        <img
          className="fern-signin-team"
          src={teamImage}
          alt="Four FERN colleagues: an engineer, the FERN guide, a facilities colleague and a professional adviser."
        />
        <h3>One platform. Complete visibility.</h3>
        <div className="fern-signin-benefits">
          <div>
            <Buildings size={26} aria-hidden="true" />
            <h4>Smart facilities</h4>
            <p>Connected data across every site.</p>
          </div>
          <div>
            <ShieldCheck size={26} aria-hidden="true" />
            <h4>Trusted intelligence</h4>
            <p>Guidance with governance and control.</p>
          </div>
          <div>
            <ChartBar size={26} aria-hidden="true" />
            <h4>Better outcomes</h4>
            <p>Optimise cost, risk and performance.</p>
          </div>
        </div>
        <p className="fern-signin-platform">FERN is an Amazon internal platform</p>
      </section>
      <header className="fern-signin-mobile-brand">
        <div>
          <div className="fern-signin-brand">
            <strong>FERN</strong>
            <img src={fernMark} alt="" />
          </div>
          <p>Digital FM ecosystem</p>
        </div>
        <img className="fern-signin-mobile-guide" src={guideImage} alt="" />
      </header>

      <div className="fern-signin-form-panel">
        <div className="fern-signin-language">
          <Box color="text-body-secondary" fontSize="body-s">
            <span lang="en-US">English (US)</span>
          </Box>
        </div>

        <div className="fern-signin-form-wrap">
          <div className="fern-signin-form-content">
            <form onSubmit={handleSignIn} noValidate>
              <Container
                header={
                  <Header variant="h1" description="Preview access · Use username demo and password demo.">
                    Welcome to FERN
                  </Header>
                }
              >
                <Form
                  actions={
                    <Button variant="primary" formAction="submit" loading={loading} loadingText="Signing in">
                      Sign in
                    </Button>
                  }
                  secondaryActions={
                    <Box variant="small" color="text-body-secondary">
                      Amazon sign-in and password recovery are not connected in this preview.
                    </Box>
                  }
                  errorText={error || undefined}
                >
                  <SpaceBetween size="l">
                    <FormField label="Demo username" controlId="fern-signin-email">
                      <Input
                        controlId="fern-signin-email"
                        autoComplete="username"
                        value={email}
                        placeholder="Enter demo"
                        invalid={!!error}
                        onChange={({ detail }) => {
                          setEmail(detail.value);
                          setError('');
                        }}
                      />
                    </FormField>
                    <FormField label="Password" controlId="fern-signin-password">
                      <SpaceBetween size="xs">
                        <Input
                          controlId="fern-signin-password"
                          autoComplete="current-password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          placeholder="Enter your password"
                          invalid={!!error}
                          onChange={({ detail }) => {
                            setPassword(detail.value);
                            setError('');
                          }}
                        />
                        <Checkbox checked={showPassword} onChange={({ detail }) => setShowPassword(detail.checked)}>
                          Show password
                        </Checkbox>
                      </SpaceBetween>
                    </FormField>
                    <Box variant="small" color="text-body-secondary">
                      This is a demonstration, not an Amazon account sign-in. You stay signed in on this tab until you
                      sign out or close it.
                    </Box>
                  </SpaceBetween>
                </Form>
              </Container>
            </form>
          </div>
        </div>

        {info && (
          <section className="fern-signin-info" aria-label={info} role="region" aria-live="polite">
            <Alert
              type="info"
              header={info}
              dismissible
              dismissAriaLabel="Close information"
              onDismiss={() => setInfo(null)}
            >
              {infoText[info]}
            </Alert>
          </section>
        )}
        <div className="fern-signin-legal">
          <SpaceBetween direction="horizontal" size="m" alignItems="center">
            {Object.keys(infoText).map((label) => (
              <Button key={label} variant="inline-link" onClick={() => setInfo(label)}>
                {label}
              </Button>
            ))}
          </SpaceBetween>
        </div>
      </div>
    </div>
  );
}
