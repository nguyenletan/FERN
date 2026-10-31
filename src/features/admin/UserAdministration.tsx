// DEMONSTRATION of the FERN Administration area requested by Amazon: add people, assign roles and choose what each
// role can see. Sample data only (adminSample.ts); nothing is sent to Midway, APM or any Amazon system.
import { useEffect, useMemo, useState } from 'react';
import Alert from '@cloudscape-design/components/alert';
import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Cards from '@cloudscape-design/components/cards';
import Checkbox from '@cloudscape-design/components/checkbox';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Modal from '@cloudscape-design/components/modal';
import Multiselect from '@cloudscape-design/components/multiselect';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';
import Tabs from '@cloudscape-design/components/tabs';
import TextFilter from '@cloudscape-design/components/text-filter';
import { homeApplications } from '../dashboard/homeApplications.ts';
import { Page } from '../../app/ui';
import {
  loadAdminState,
  saveAdminState,
  resetAdminState,
  validAlias,
  type AdminState,
  type AdminUser,
  type Role,
} from './adminSample';

type Editing = { mode: 'add' | 'edit'; name: string; alias: string; roles: string[] };
const capabilities: [keyof Pick<Role, 'writeGuides' | 'approveGuides' | 'manageUsers'>, string][] = [
  ['writeGuides', 'Write guides'],
  ['approveGuides', 'Approve guides'],
  ['manageUsers', 'Manage users'],
];

export default function UserAdministration({ onContentWalkthrough }: { onContentWalkthrough?: () => void }) {
  const [state, setState] = useState<AdminState>(loadAdminState);
  useEffect(() => saveAdminState(state), [state]);
  const [notice, setNotice] = useState('');
  const roleName = (id: string) => state.roles.find((role) => role.id === id)?.name ?? id;
  const roleOptions = state.roles.map((role) => ({ value: role.id, label: role.name, description: role.description }));

  // Users tab
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState<AdminUser[]>([]);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [removing, setRemoving] = useState<AdminUser | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const users = useMemo(() => {
    const q = filter.toLowerCase().trim();
    return q
      ? state.users.filter((user) =>
          [user.name, user.alias, ...user.roles.map(roleName)].some((text) => text.toLowerCase().includes(q)),
        )
      : state.users;
  }, [filter, state]);
  const aliasTaken = editing?.mode === 'add' && state.users.some((user) => user.alias === editing.alias.trim());
  const aliasError =
    submitted && editing
      ? !validAlias(editing.alias.trim())
        ? 'Enter the Amazon alias in lower case, e.g. jdoe.'
        : aliasTaken
          ? 'This person is already in FERN.'
          : ''
      : '';
  const nameError = submitted && editing && !editing.name.trim() ? 'Enter the person’s name.' : '';
  const rolesError = submitted && editing && !editing.roles.length ? 'Choose at least one role.' : '';
  function save() {
    setSubmitted(true);
    if (!editing) return;
    const alias = editing.alias.trim(),
      name = editing.name.trim();
    if (!name || !validAlias(alias) || aliasTaken || !editing.roles.length) return;
    setState((previous) => ({
      ...previous,
      users:
        editing.mode === 'add'
          ? [
              ...previous.users,
              { alias, name, roles: editing.roles, status: 'Invited', added: new Date().toISOString().slice(0, 10) },
            ]
          : previous.users.map((user) => (user.alias === alias ? { ...user, name, roles: editing.roles } : user)),
    }));
    setNotice(
      editing.mode === 'add'
        ? `${name} was added as ${editing.roles.map(roleName).join(', ')}. In production they would receive an invitation and sign in with Midway.`
        : `Roles updated for ${name}.`,
    );
    setEditing(null);
    setSelected([]);
    setSubmitted(false);
  }
  function remove() {
    if (!removing) return;
    setState((previous) => ({ ...previous, users: previous.users.filter((user) => user.alias !== removing.alias) }));
    setNotice(`${removing.name} was removed from FERN.`);
    setRemoving(null);
    setSelected([]);
  }

  // Roles & access tab
  const toggleApp = (roleId: string, slug: string, on: boolean) =>
    setState((previous) => ({
      ...previous,
      roles: previous.roles.map((role) =>
        role.id !== roleId
          ? role
          : { ...role, apps: on ? [...role.apps, slug] : role.apps.filter((item) => item !== slug) },
      ),
    }));
  const toggleCapability = (roleId: string, key: (typeof capabilities)[number][0], on: boolean) =>
    setState((previous) => ({
      ...previous,
      roles: previous.roles.map((role) => (role.id !== roleId ? role : { ...role, [key]: on })),
    }));

  // Preview tab
  const [previewRole, setPreviewRole] = useState(state.roles[0]?.id ?? '');
  const preview = state.roles.find((role) => role.id === previewRole);

  return (
    <Page
      title="Users & roles"
      info={<Badge color="grey">Demo</Badge>}
      description="Add people to FERN, give them roles and choose which applications and tools each role can see."
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          {onContentWalkthrough && <Button onClick={onContentWalkthrough}>Content administration walkthrough</Button>}
          <Button
            iconName="refresh"
            onClick={() => {
              setState(resetAdminState());
              setNotice('Sample data restored.');
            }}
          >
            Reset sample data
          </Button>
        </SpaceBetween>
      }
    >
      <Alert type="info" header="Demonstration with sample data">
        Nothing on this page is saved to an Amazon system, and the people listed are fictitious. In production, people
        sign in with Midway; whether their roles are managed here or taken from APM is still to be confirmed. Benito or
        Richard would approve new users. Changes are kept only in this browser tab.
      </Alert>
      {notice && (
        <Alert type="success" dismissible onDismiss={() => setNotice('')}>
          {notice}
        </Alert>
      )}
      <Tabs
        tabs={[
          {
            id: 'users',
            label: `Users (${state.users.length})`,
            content: (
              <Table
                items={users}
                trackBy="alias"
                selectionType="single"
                selectedItems={selected}
                onSelectionChange={({ detail }) => setSelected(detail.selectedItems)}
                ariaLabels={{
                  selectionGroupLabel: 'Users',
                  itemSelectionLabel: (_, user) => user.name,
                  allItemsSelectionLabel: () => 'All users',
                }}
                variant="container"
                wrapLines
                header={
                  <Header
                    variant="h2"
                    counter={`(${state.users.length})`}
                    description="People who can sign in to FERN and the roles they hold."
                    actions={
                      <SpaceBetween direction="horizontal" size="xs">
                        <Button disabled={!selected.length} onClick={() => setRemoving(selected[0])}>
                          Remove
                        </Button>
                        <Button
                          disabled={!selected.length}
                          onClick={() => {
                            const user = selected[0];
                            setSubmitted(false);
                            setEditing({ mode: 'edit', name: user.name, alias: user.alias, roles: user.roles });
                          }}
                        >
                          Edit roles
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setSubmitted(false);
                            setEditing({ mode: 'add', name: '', alias: '', roles: [] });
                          }}
                        >
                          Add user
                        </Button>
                      </SpaceBetween>
                    }
                  >
                    Users
                  </Header>
                }
                filter={
                  <TextFilter
                    filteringText={filter}
                    filteringPlaceholder="Find a person, alias or role"
                    filteringAriaLabel="Find users"
                    onChange={({ detail }) => setFilter(detail.filteringText)}
                  />
                }
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No users</b>
                    <Box variant="p" color="inherit">
                      Add a person to give them access to FERN.
                    </Box>
                  </Box>
                }
                columnDefinitions={[
                  { id: 'name', header: 'Name', cell: (user) => user.name },
                  // Aliases are ID strings: Cloudscape monospace code style.
                  { id: 'alias', header: 'Amazon alias', cell: (user) => <Box variant="code">{user.alias}</Box> },
                  {
                    id: 'roles',
                    header: 'Roles',
                    cell: (user) => (
                      <SpaceBetween direction="horizontal" size="xxs">
                        {user.roles.map((id) => (
                          <Badge key={id}>{roleName(id)}</Badge>
                        ))}
                      </SpaceBetween>
                    ),
                  },
                  {
                    id: 'status',
                    header: 'Status',
                    cell: (user) => (
                      <StatusIndicator type={user.status === 'Active' ? 'success' : 'pending'}>
                        {user.status}
                      </StatusIndicator>
                    ),
                  },
                  { id: 'added', header: 'Added', cell: (user) => user.added },
                ]}
              />
            ),
          },
          {
            id: 'access',
            label: 'Roles & access',
            content: (
              <Table
                items={state.roles}
                trackBy="id"
                variant="container"
                wrapLines
                stickyColumns={{ first: 1 }}
                header={
                  <Header
                    variant="h2"
                    description="Tick what each role can see and do. A person with several roles sees everything their roles allow. These are proposals for Benito and Richard to confirm."
                  >
                    Roles &amp; access
                  </Header>
                }
                columnDefinitions={[
                  {
                    id: 'role',
                    header: 'Role',
                    cell: (role) => (
                      <SpaceBetween size="xxxs">
                        <b>{role.name}</b>
                        <Box variant="small">{role.description}</Box>
                      </SpaceBetween>
                    ),
                  },
                  ...homeApplications.map((item) => ({
                    id: item.slug,
                    header: item.title,
                    cell: (role: Role) => (
                      <Checkbox
                        checked={role.apps.includes(item.slug)}
                        onChange={({ detail }) => toggleApp(role.id, item.slug, detail.checked)}
                        ariaLabel={`${role.name} can see ${item.title}`}
                      />
                    ),
                  })),
                  ...capabilities.map(([key, label]) => ({
                    id: key,
                    header: label,
                    cell: (role: Role) => (
                      <Checkbox
                        checked={role[key]}
                        onChange={({ detail }) => toggleCapability(role.id, key, detail.checked)}
                        ariaLabel={`${role.name}: ${label}`}
                      />
                    ),
                  })),
                ]}
              />
            ),
          },
          {
            id: 'preview',
            label: 'Preview as role',
            content: (
              <Container
                header={
                  <Header
                    variant="h2"
                    description="See which applications and tools a person with this role would see in FERN."
                  >
                    Preview as role
                  </Header>
                }
              >
                <SpaceBetween size="l">
                  <FormField label="Role">
                    <Select
                      selectedOption={roleOptions.find((option) => option.value === previewRole) ?? null}
                      options={roleOptions}
                      onChange={({ detail }) => setPreviewRole(detail.selectedOption.value ?? '')}
                    />
                  </FormField>
                  {preview && (
                    <>
                      <ColumnLayout columns={3} variant="text-grid">
                        {capabilities.map(([key, label]) => (
                          <div key={key}>
                            <Box variant="awsui-key-label">{label}</Box>
                            <StatusIndicator type={preview[key] ? 'success' : 'stopped'}>
                              {preview[key] ? 'Yes' : 'No'}
                            </StatusIndicator>
                          </div>
                        ))}
                      </ColumnLayout>
                      <Cards
                        items={homeApplications.filter((item) => preview.apps.includes(item.slug))}
                        trackBy="slug"
                        cardsPerRow={[{ cards: 1 }, { minWidth: 640, cards: 3 }]}
                        header={
                          <Header variant="h3" counter={`(${preview.apps.length}/${homeApplications.length})`}>
                            Applications this role sees
                          </Header>
                        }
                        empty={
                          <Box textAlign="center" color="inherit">
                            This role sees no applications.
                          </Box>
                        }
                        cardDefinition={{
                          header: (item) => item.title,
                          sections: [{ id: 'description', content: (item) => item.description }],
                        }}
                      />
                    </>
                  )}
                </SpaceBetween>
              </Container>
            ),
          },
        ]}
      />
      <Modal
        visible={!!editing}
        onDismiss={() => setEditing(null)}
        header={editing?.mode === 'add' ? 'Add user' : 'Edit roles'}
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={save}>
                {editing?.mode === 'add' ? 'Add user' : 'Save roles'}
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        {editing && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              save();
            }}
          >
            <Form>
              <SpaceBetween size="m">
                <FormField label="Name" errorText={nameError}>
                  <Input
                    value={editing.name}
                    onChange={({ detail }) => setEditing({ ...editing, name: detail.value })}
                  />
                </FormField>
                <FormField
                  label="Amazon alias"
                  description="The person signs in with Midway using this alias."
                  errorText={aliasError}
                >
                  <Input
                    value={editing.alias}
                    disabled={editing.mode === 'edit'}
                    onChange={({ detail }) => setEditing({ ...editing, alias: detail.value.toLowerCase() })}
                  />
                </FormField>
                <FormField label="Roles" errorText={rolesError}>
                  <Multiselect
                    selectedOptions={roleOptions.filter((option) => editing.roles.includes(option.value))}
                    options={roleOptions}
                    placeholder="Choose roles"
                    onChange={({ detail }) =>
                      setEditing({ ...editing, roles: detail.selectedOptions.map((option) => option.value!) })
                    }
                  />
                </FormField>
              </SpaceBetween>
            </Form>
          </form>
        )}
      </Modal>
      <Modal
        visible={!!removing}
        onDismiss={() => setRemoving(null)}
        header="Remove user"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setRemoving(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={remove}>
                Remove
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        Remove <b>{removing?.name}</b> from FERN? They will no longer be able to sign in to FERN.
      </Modal>
    </Page>
  );
}
