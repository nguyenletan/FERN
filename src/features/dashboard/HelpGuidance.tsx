import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { ExpandAllControls, NavLink, Page, Prose, Section, Terms } from '../../app/ui';
import { fernGuide, useMediaPosition } from '../../app/visuals';

function Topic({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Section variant="default" header={label}>
      <SpaceBetween size="s">{children}</SpaceBetween>
    </Section>
  );
}
export default function HelpGuidance() {
  const mediaPosition = useMediaPosition();
  return (
    <Page
      title="Help & Guidance"
      description="Find the right help without needing to understand how FERN is built. Choose the topic that best describes what you need."
    >
      <div className="fern-guide-mascot">
        <Container
          media={{
            content: <img src={fernGuide.src} alt={fernGuide.alt} />,
            position: mediaPosition,
            width: '220px',
            height: '200px',
          }}
        >
          <SpaceBetween size="s">
            <Box variant="h2">Need a hand?</Box>
            <Box variant="p">
              Tell FERN what you are looking for in the search box at the top of every page, or choose a help topic
              below. If you are new, start with Get started.
            </Box>
            <SpaceBetween direction="horizontal" size="l">
              <NavLink to="Get started">Get started</NavLink>
              <NavLink to="Learn">Explore Learn</NavLink>
            </SpaceBetween>
          </SpaceBetween>
        </Container>
      </div>
      <Container
        header={
          <Header variant="h2" actions={<ExpandAllControls label="Help & Guidance" />}>
            Help topics
          </Header>
        }
      >
        <SpaceBetween size="s">
          <Topic label="Using FERN">
            <Prose>
              <p>
                Use the navigation to move between Workspace guidance, learning and reference material. Application
                access and facility selection are not available on this website.
              </p>
            </Prose>
            <SpaceBetween direction="horizontal" size="l">
              <NavLink to="Get started">Get started</NavLink>
              <NavLink to="FM Overview">Open FM Overview</NavLink>
            </SpaceBetween>
          </Topic>
          <Topic label="FM guidance">
            <Prose>
              <p>
                For service models, tiers, assets, performance or assurance, start with Learn. Use Standards &amp;
                Reference Library guidance to understand source status and applicability.
              </p>
              <p>
                Questions requiring specialist judgement need the appropriate authorised specialist. A specialist
                contact route is not available here.
              </p>
            </Prose>
            <SpaceBetween direction="horizontal" size="l">
              <NavLink to="Learn">Explore Learn</NavLink>
              <NavLink to="Standards & Reference Library">Standards &amp; Reference Library</NavLink>
              <NavLink to="Leadership & Policy">Leadership &amp; Policy</NavLink>
            </SpaceBetween>
          </Topic>
          <Topic label="Data & evidence problem">
            <Prose>
              <p>
                If information is missing, incomplete, outdated or inconsistent, check the facility, asset or record and
                the source version first. Record what you expected and what you found; you do not need to diagnose the
                cause.
              </p>
              <p>
                <strong>Missing does not mean zero.</strong> No maintenance history does not mean no maintenance
                occurred. Missing compliance evidence does not demonstrate compliance. A missing cost is not a zero
                cost.
              </p>
              <p>
                Where sources disagree, retain both references and explain the difference. Do not silently replace one
                with an assumption.
              </p>
            </Prose>
            <NavLink to="Audit & Assurance">Read evidence guidance</NavLink>
          </Topic>
          <Topic label="Access problem">
            <Prose>
              <p>
                Check the page you intended to open and any message shown. Do not include restricted document or
                facility details when asking for help.
              </p>
            </Prose>
            <Terms
              items={[
                ['Not authorised', 'Your current access does not permit the destination.'],
                ['Not available', 'The destination or information is unavailable.'],
                ['Temporarily unavailable', 'A normally available capability cannot currently be accessed.'],
                ['Not found', 'The requested destination cannot be found.'],
              ]}
            />
            <Prose>
              <p>An access-request route is not available here. No access request has been submitted.</p>
            </Prose>
            <NavLink to="Get started">Find another starting point</NavLink>
          </Topic>
          <Topic label="Technical problem">
            <Prose>
              <p>
                Note the page or application, what you were trying to do, what happened instead and when it happened.
                Include an error reference only if one was actually displayed.
              </p>
              <p>
                Before refreshing or trying again, save or export your work where possible. Check whether a save or
                other action succeeded before repeating it.
              </p>
              <p>
                Do not include passwords, credentials or unnecessary sensitive information. A technical-support
                submission route is not available here.
              </p>
            </Prose>
            <NavLink to="FM Overview">Return to FM Overview</NavLink>
          </Topic>
          <Topic label="Content question">
            <Prose>
              <p>
                Identify the title, document ID, version and section you are asking about. Describe whether your
                question concerns accuracy, applicability, terminology, an outdated version or a broken link.
              </p>
              <p>
                Use the authorised author, owner or specialist contact shown on the source record when available.
                Contact details are not yet available in this library view.
              </p>
              <p>
                Draft and Review material is not Approved. Superseded means replaced by a newer version; Archived means
                retained historically. Reference material is supporting information.
              </p>
            </Prose>
            <NavLink to="Standards & Reference Library">Review reference guidance</NavLink>
          </Topic>
          <Topic label="Improvement suggestion">
            <Prose>
              <p>
                Describe what you would improve, the problem it would solve, where it applies and who would benefit.
                Include a useful example if you have one.
              </p>
              <p>
                A suggestion-submission route is not available here. Reading this guidance does not submit an idea or
                change a policy, methodology or application.
              </p>
            </Prose>
            <NavLink to="Continual Improvement">Read Continual Improvement guidance</NavLink>
          </Topic>
          <Topic label="What’s new in FERN">
            <Prose>
              <p>
                Explore available update information and selected future capabilities. Build in FERN remains a future
                capability, not an available tool.
              </p>
            </Prose>
            <NavLink to="What’s new in FERN">Explore updates and future capabilities</NavLink>
          </Topic>
        </SpaceBetween>
      </Container>
      <Alert type="warning" header="For an immediate operational issue">
        FERN Help is not an emergency response service. Follow your established facility emergency or
        operational-response process for immediate life-safety or critical operational incidents.
      </Alert>
    </Page>
  );
}
