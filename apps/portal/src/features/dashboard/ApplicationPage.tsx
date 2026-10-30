import Alert from '@cloudscape-design/components/alert';
import Badge from '@cloudscape-design/components/badge';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { applicationByName, homeApplications, type FernApplication } from './homeApplications.ts';
import { Card, NavLink, Page } from '../../app/ui';
import { IconTitle, applicationIcons } from '../../app/visuals';

// Introduction page for a planned FERN application. It describes the tool and never launches it (WEB-SCOPE-01).
export default function ApplicationPage({ app }: { app: FernApplication }) {
  const related = app.related
    .map((name) => applicationByName(name))
    .filter((item): item is FernApplication => Boolean(item));
  return (
    <Page
      title={
        <IconTitle icon={applicationIcons[homeApplications.indexOf(app)]} size={34}>
          {app.title}
        </IconTitle>
      }
      description={app.summary}
      info={
        <SpaceBetween direction="horizontal" size="xs">
          <Badge color="blue">Coming soon</Badge>
          {app.note && <Badge>{app.note}</Badge>}
        </SpaceBetween>
      }
    >
      <Alert type="info" header="Availability">
        This application is not yet available on the FERN website. When it is released, it will open from this page.
        This description is a draft for review; features and steps may change before release.
      </Alert>
      <ColumnLayout columns={2}>
        <Card title="Who it is for">
          <ul>
            {app.audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card title="Works with">
          <SpaceBetween size="xs">
            {related.map((item) => (
              <IconTitle key={item.slug} icon={applicationIcons[homeApplications.indexOf(item)]} size={20}>
                <NavLink to={item.name}>{item.title}</NavLink>
              </IconTitle>
            ))}
          </SpaceBetween>
        </Card>
      </ColumnLayout>
      <Card title="What you will be able to do">
        <ul>
          {app.capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
      <Card title="How it will work" description="The main steps, in order.">
        <ol>
          {app.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Card>
    </Page>
  );
}
