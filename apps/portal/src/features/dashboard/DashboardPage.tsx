import Box from '@cloudscape-design/components/box';
import Cards from '@cloudscape-design/components/cards';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { HomeMission } from '../framework/MissionPillars';
import HomeApplications from './HomeApplications.tsx';
import { NavButton, NavLink, Page } from '../../app/ui';
import { IconTitle, hero, lessonIcons, topicIcons, useMediaPosition } from '../../app/visuals';

const routes = [
  { to: 'Workspace', title: 'Workspace', description: 'FM direction and practical guidance.' },
  {
    to: 'Standards & Reference Library',
    title: 'Standards & Reference Library',
    description: 'Find and read the BBM standards and source material.',
  },
  { to: 'Learn', title: 'Learn', description: 'Build your understanding of FM at your own pace.' },
];
// One main way in to each destination (Amazon review, 30 Oct 2026): About and Get started are the hero actions;
// Workspace, the library and Learn are the three starting points; lessons below open a specific topic.
const lessons = [
  ['Understanding FERN', 'An overview of FERN and how its tools support facility management.'],
  ['Service Models Explained', 'Learn about service models and where to start a comparison.'],
  ['From Tender to Transition', 'Follow the steps from assessment to mobilisation.'],
];
export default function DashboardPage() {
  const mediaPosition = useMediaPosition();
  return (
    <Page title="Welcome to FERN">
      <Container
        media={{
          content: <img src={hero.src} alt={hero.alt} />,
          position: mediaPosition,
          width: '48%',
          height: '220px',
        }}
      >
        <SpaceBetween size="m">
          <Box variant="h2" fontSize={mediaPosition === 'top' ? 'heading-xl' : 'display-l'}>
            Your friendly guide to better facilities.
          </Box>
          <Box variant="p" fontSize="heading-s" color="text-body-secondary">
            Find the tools, guidance and knowledge to plan your next step.
          </Box>
          <SpaceBetween direction="horizontal" size="xs">
            <NavButton to="Get Started" variant="primary">
              Get started
            </NavButton>
            <NavButton to="About FERN">What is FERN?</NavButton>
          </SpaceBetween>
        </SpaceBetween>
      </Container>
      <Cards
        header={
          <Header
            variant="h2"
            description="Choose a starting point. You can explore the guidance without selecting a facility."
          >
            What would you like to do today?
          </Header>
        }
        items={routes}
        trackBy="to"
        cardsPerRow={[{ cards: 1 }, { minWidth: 640, cards: 3 }]}
        cardDefinition={{
          header: (item) => (
            <IconTitle icon={topicIcons[item.to]} size={30}>
              <NavLink to={item.to} fontSize="heading-m">
                {item.title}
              </NavLink>
            </IconTitle>
          ),
          sections: [{ id: 'description', content: (item) => item.description }],
        }}
      />
      <HomeMission />
      <HomeApplications />
      <Container
        header={
          <Header variant="h2" description="Short introductions you can read at your own pace.">
            Popular learning topics
          </Header>
        }
      >
        <ColumnLayout columns={3}>
          {lessons.map(([title, text]) => (
            <div key={title}>
              <IconTitle icon={lessonIcons[title]}>
                <NavLink to={title} fontSize="heading-s">
                  {title}
                </NavLink>
              </IconTitle>
              <div>{text}</div>
            </div>
          ))}
        </ColumnLayout>
      </Container>
    </Page>
  );
}
