# FM Mobilisation and Transition Tracker start-up guide

Version 1.2 · 7 September 2026

## Open and choose your plan

1. Open the FERN portal at http://127.0.0.1:4173/ while its server is running.
2. Sign in with the demonstration credentials `demo` / `demo` and choose **FM Mobilisation & Transition Tracker**.
3. Check the site on the opening screen.
4. Choose **Continue saved plan** if your plan is shown. Otherwise choose **Start a new plan**.
5. If a saved plan already exists and you start again, confirm **Start new draft**. The old saved copy stays until you save its replacement.

The standalone tool at http://127.0.0.1:4177/ uses demonstration site BHX4 and different browser storage. Keep using the same browser and address for the same saved work.

## Set up a new plan

**Step 1 — Facility & purpose:** check the displayed facility, enter a Launch plan name and choose the Mobilisation / transition type. To change the portal site, save first and open **Ask FERN and change site context** below the tracker.

**Step 2 — Delivery arrangement:** select current and target models and the facility service tier. Internal Full Blue Badge, IFM, Hybrid, Fully Contained and AFM pending definition are represented; leave unknown choices blank.

**Step 3 — Affected scope:** describe services, boundaries and asset groups. Open **Asset-specific exceptions (optional)** only when needed.

**Step 4 — Review:** check the summary and outstanding information. Choose **Save draft and open tasks**. Missing setup information may remain provisional; saving is not approval.

Use Back, Next or the numbered step buttons to revisit details. No assumed tasks or staffing levels are generated.

## Add and update tasks

1. Choose **Add launch task**.
2. Enter the task description, responsible owner and a deadline in **DD-MM-YYYY**.
3. Add progress, blocker notes or an evidence reference.
4. Choose Not started, In progress, Blocked or Complete.
5. Complete needs description, owner, valid deadline and evidence. Any missing fields are explained next to the inputs.
6. Choose **Save draft** at the top and check the result message.

Click a task row to edit or close it. Use **Search tasks** and **Filter by status** to find work. Use **Edit plan setup** if the scope changes.

To remove a task, choose Remove task and confirm. **Undo last removal** can recover the latest removal while the workspace remains open; it is not a permanent history.

## Save, return and keep backups

Save draft updates one saved plan per site at this browser address. The top bar shows Unsaved changes or the last saved state/time. There is no autosave. Save before leaving; the application also warns about unsaved navigation/sign-out changes and requests a browser close/reload warning.

Next time, return to the same address and select **Continue saved plan**. You do not need to repeat setup.

Expand **Backups and recovery** to download a JSON backup, restore the saved copy or import another compatible backup. Restore and import ask before replacing the current draft. Import is not saved automatically. Keep dated downloads separately from the browser copy.

If another tab changed the saved plan, Save will refuse to overwrite it. Download your draft, restore the latest copy and reconcile manually.

## What the counts mean

Task totals, blocked tasks and recorded-complete tasks describe what users entered. They do not prove readiness, confirm evidence or authorise a service to go live. Formal approval and shared Amazon accounts/storage are not connected.

**About readiness and approvals — planned governance** contains future workflow information. It does not block today's manual setup and task tracking.

## If FERN is not running

An engineer can open a terminal in the installed project folder and run `pnpm dev --host 127.0.0.1 --port 4173 --strictPort`. For the separate tracker, run `pnpm dev:launch-tracker`. Leave the terminal running. First-time installation follows the repository README using Node.js 24 and pnpm 11.19.0.

Read [the full user guide](FM-MOBILISATION-USER-GUIDE.md) for purposes, roles, limits and troubleshooting.
