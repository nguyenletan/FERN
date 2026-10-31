import { useEffect } from 'react';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Icon from '@cloudscape-design/components/icon';
import data from './frameworkContent.json';
import FrameworkContent from './FrameworkContent';
import { Card, ExpandAllControls, NavButton, NavLink, Page, Prose, Section, revealSection } from '../../app/ui';
import { IconTitle, PageBanner, pillarIcons } from '../../app/visuals';

/** Home page summary: the mission and the eight pillar names, with one link to the full page. */
export function HomeMission() {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Our purpose. Your everyday impact."
          actions={<NavButton to="Mission & Pillars">Explore our mission &amp; pillars</NavButton>}
        >
          One mission. Eight ways to make it happen.
        </Header>
      }
    >
      <SpaceBetween size="m">
        <Prose>
          <p>{data.mission}</p>
        </Prose>
        <ColumnLayout columns={4} variant="text-grid" minColumnWidth={160}>
          {data.pillars.map((p, i) => (
            <IconTitle key={p.number} icon={pillarIcons[i]} size="big">
              <Box variant="small">
                <Box variant="awsui-key-label">Pillar {p.number}</Box>
                {p.name}
              </Box>
            </IconTitle>
          ))}
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
}
export default function MissionPillars({ pillar }: { pillar?: number }) {
  useEffect(() => {
    if (pillar) revealSection(`fw-pillar-${pillar}`);
  }, [pillar]);
  return (
    <Page
      title="Mission & Pillars"
      description="Better facilities begin with clear direction."
    >
      <PageBanner scene="Mission & Pillars" />
      <Container
        header={
          <Header variant="h2" description="The purpose behind our work">
            Our mission
          </Header>
        }
      >
        <SpaceBetween size="m">
          <Prose>
            <p>{data.mission}</p>
          </Prose>
          <SpaceBetween direction="horizontal" size="l">
            {/* Mission values, not statuses: neutral check icons (Cloudscape reserves green for status). */}
            {['Safe & reliable', 'Efficient & sustainable', 'People & outcomes'].map((value) => (
              <SpaceBetween key={value} direction="horizontal" size="xxs" alignItems="center">
                <Icon name="check" variant="subtle" />
                <Box>{value}</Box>
              </SpaceBetween>
            ))}
          </SpaceBetween>
        </SpaceBetween>
      </Container>
      <Card title="From purpose to everyday practice">
        <p>
          The eight pillars connect our FM mission with the way we lead, decide and learn. They bring Amazon leadership
          behaviours and relevant ISO management-system guidance into practical FM work.
        </p>
        <ol>
          {[
            'Understand the need',
            'Plan the response',
            'Coordinate delivery',
            'Check the evidence',
            'Verify and learn',
          ].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </Card>
      <Container
        header={
          <Header
            variant="h2"
            description="Choose a pillar to see its meaning, the behaviours behind it and how to apply it."
            actions={<ExpandAllControls label="the eight pillars" />}
          >
            The eight FERN pillars
          </Header>
        }
      >
        <SpaceBetween size="s">
          {data.pillars.map((p, i) => {
            const [intro, ...rest] = p.body.split('\n\n');
            return (
              <Section
                id={`fw-pillar-${p.number}`}
                key={p.number}
                variant="default"
                header={`Pillar ${p.number} · ${p.name}`}
                description={intro.replace(/\*\*/g, '')}
              >
                <SpaceBetween size="s">
                  <FrameworkContent text={rest.join('\n\n')} />
                  <NavLink to="Workspace">Apply this in the Workspace</NavLink>
                </SpaceBetween>
              </Section>
            );
          })}
        </SpaceBetween>
      </Container>
      <Container
        header={
          <Header
            variant="h2"
            description="Start with the guidance that supports your next decision."
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <NavButton to="Leadership & Policy">Read Leadership &amp; Policy</NavButton>
                <NavButton to="Workspace" variant="primary">
                  Explore the Workspace
                </NavButton>
              </SpaceBetween>
            }
          >
            Put the pillars into practice
          </Header>
        }
      />
    </Page>
  );
}
