import { visibleCountryRow } from './countrySearch';
import { regionLabel } from './regionLabels';
import RegionLabel from './RegionLabel';
import { useMemo, useState, useEffect } from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { Section } from '../../app/ui';
import { taskReading, type ReadingPage, type ReadingRow } from './taskReading';
function FieldList({ fields }: { fields: ReadingRow['fields'] }) {
  return (
    <KeyValuePairs
      columns={2}
      items={fields.map((field) => ({
        label: field.label,
        value: field.value ? (
          field.label === 'Region' ? (
            <RegionLabel code={field.value} />
          ) : (
            field.value
          )
        ) : (
          <Box color="text-status-inactive" variant="span">
            Blank in source
          </Box>
        ),
      }))}
    />
  );
}
function Fields({ row }: { row: ReadingRow }) {
  const interval = (label: string) => /^(PM|Daily|Weekly|Monthly|\d+ Monthly|Additional)$/.test(label);
  const primary = row.fields.filter((f) => !interval(f.label));
  const filled = row.fields.filter((f) => interval(f.label) && f.value.trim());
  const blank = row.fields.filter((f) => interval(f.label) && !f.value.trim());
  return (
    <SpaceBetween size="m">
      <FieldList fields={primary} />
      {filled.length + blank.length > 0 && (
        <section>
          <Box variant="h5">Source interval / evidence columns</Box>
          <Box variant="small">
            Read these markers with the original source key; they do not replace the task frequency and conditions.
          </Box>
          <FieldList fields={filled} />
          {blank.length > 0 && (
            <Section variant="footer" header={`Blank interval cells (${blank.length})`}>
              <FieldList fields={blank} />
            </Section>
          )}
        </section>
      )}
    </SpaceBetween>
  );
}
export default function TaskReader({
  pages,
  kind,
  country = '',
}: {
  pages: ReadingPage[];
  kind: string;
  country?: string;
}) {
  const reading = useMemo(() => taskReading(pages), [pages]);
  const [showOtherCountries, setShowOtherCountries] = useState(false);
  useEffect(() => setShowOtherCountries(false), [country]);
  const filterCountry = showOtherCountries ? '' : country;
  const tasks = reading.tasks.filter((row) => visibleCountryRow(row, filterCountry));
  const regions = reading.regions.filter((row) => visibleCountryRow(row, filterCountry));
  const hidden = reading.tasks.length + reading.regions.length - tasks.length - regions.length;
  return (
    <section id="bbm-readable-tasks" aria-label="Task reading view">
      <SpaceBetween size="s">
        <Box variant="h3">Tasks and conditions</Box>
        <Box variant="p">
          Source wording arranged by row for easier reading. Read the scope, general instructions and original pages as
          well. Physical task frequency and evidence-upload intervals are separate; blank cells remain explicitly blank.
        </Box>
        {country && (
          <SpaceBetween direction="horizontal" size="s" alignItems="center">
            <Box variant="small">
              {showOtherCountries
                ? 'Showing all countries in this standard.'
                : `Showing ${regionLabel(country).label}, shared All rows and rows without a recognised country. ${hidden} other-country rows hidden.`}
            </Box>
            <Button onClick={() => setShowOtherCountries((value) => !value)}>
              {showOtherCountries ? 'Show selected country only' : 'Show all countries in this standard'}
            </Button>
          </SpaceBetween>
        )}
        {!tasks.length && (
          <Box variant="p">
            No task rows are shown for this selection. Check regional conditions and the complete original pages below.
          </Box>
        )}
        <Box variant="small">
          {tasks.length} source task rows{regions.length ? ` · ${regions.length} regional-condition rows` : ''}
        </Box>
        {tasks.map((row, i) => {
          const task = row.fields.find((f) => f.label === 'Tasks' || f.label === 'Task Requirements')?.value ?? '';
          const region = row.fields.find((f) => f.label === 'Region')?.value;
          return (
            <Section
              key={`${row.page}-${row.block}-${row.row}`}
              variant="container"
              defaultExpanded={i === 0}
              header={
                <>
                  {/^\d/.test(row.index) ? 'Task ' + row.index : 'Source row ' + (i + 1)}
                  {region && (
                    <>
                      {' '}
                      · <RegionLabel code={region} />
                    </>
                  )}
                </>
              }
              description={
                <>
                  {task.slice(0, 150)}
                  {task.length > 150 ? '…' : ''} · Source page {row.page}
                </>
              }
            >
              <SpaceBetween size="s">
                <Fields row={row} />
                <a href={`#bbm-${kind}-${row.page}`}>Check original page {row.page}</a>
              </SpaceBetween>
            </Section>
          );
        })}
        {regions.length > 0 && (
          <section id="bbm-readable-regions">
            <SpaceBetween size="s">
              <Box variant="h3">Regional conditions from the source</Box>
              <Box variant="p">
                These are the source rows, not a site applicability assessment. Country names and flags are reading
                aids; the original region codes are retained.
              </Box>
              {regions.map((row) => (
                <Section
                  key={`${row.page}-${row.block}-${row.row}`}
                  variant="container"
                  header={
                    row.fields.find((f) => f.label === 'Region')?.value ? (
                      <RegionLabel code={row.fields.find((f) => f.label === 'Region')!.value} />
                    ) : (
                      'Region blank in source'
                    )
                  }
                  description={`Source page ${row.page}`}
                >
                  <SpaceBetween size="s">
                    <Fields row={row} />
                    <a href={`#bbm-${kind}-${row.page}`}>Check original page {row.page}</a>
                  </SpaceBetween>
                </Section>
              ))}
            </SpaceBetween>
          </section>
        )}
      </SpaceBetween>
    </section>
  );
}
